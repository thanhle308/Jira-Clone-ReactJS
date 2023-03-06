import axios from "axios";
import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from "../../../services/JiraService";
import { ACCESS_TOKEN, USER_LOGIN } from "../../../util/setting";
import { REMOVE_USER_PROJECT,USER_SIGNIN_API, USLOGIN, GET_USER_API, GET_USER_SEARCH, ADD_USER_PROJECT, GET_LIST_PROJECT_SAGA, GET_USER_BY_PROJECT_SAGA, GET_USER_BY_PROJECT } from "../../types/Jirabugs/JirabugsType";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingType";
import { history } from "../../../App";
import { userService } from "../../../services/UserService";
import { projectService } from "../../../services/ProjectService";
import { notifiFunction } from "../../../util/Notification/notification";


//Quản lý các action saga
function* signinSaga(action) {
    console.log(action);

    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    //Gọi API
    try {
        const { data, status } = yield call(() => jiraService.signinJira(action.userLogin)); //Dùng call để sử lí nhiefu promise nhưng ở jira thì không cần

        //Lưu vào localStorage khi đăng nhập thành công
        localStorage.setItem(ACCESS_TOKEN, data.content.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))

        yield put({
            type: USLOGIN,
            userLogin: data.content
        })

        console.log(data)
        history.push('/');

    } catch (error) {
        console.log(error.response.data)
    }

    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga);
}
// Get user 

function* getUserSaga(action) {
    //Gọi API
    try {
        const { data, status } = yield call(() => userService.getUser(action.keyword));
        yield put({
            type: GET_USER_SEARCH,
            listUsers: data.content,
        })
    } catch (error) {
        console.log(error.response.data)
    }
}
export function* theoDoigetUser() {
    yield takeLatest(GET_USER_API, getUserSaga);
}

//add USER 

function* addUserProjectSaga(action) {
    //Gọi API
    try {
        const { data, status } = yield call(() => userService.assignUserProject(action.userProject));

        yield put({
            type: GET_LIST_PROJECT_SAGA
        })

    } catch (error) {
        console.log("hihi",error)
    }
}
export function* theoDoiaddUserProjectSaga() {
    yield takeLatest(ADD_USER_PROJECT, addUserProjectSaga);
}
// remove User

function* removeUserProjectSaga(action) {
    //Gọi API
    try {
        const { data, status } = yield call(() => projectService.deleteUserFromProject(action.userProject));

        if (status === 200){
            yield put({
                 type: GET_LIST_PROJECT_SAGA,
            })
            notifiFunction('success','Remove User is successful !');
         }

    } catch (error) {
        console.log("hihi",error)
        if (error.response.data.statusCode === 403){
            notifiFunction('error','Bạn không có quyền remove User !!');
           }
    }
}
export function* theoDoiremoveUserProjectSaga() {
    yield takeLatest(REMOVE_USER_PROJECT, removeUserProjectSaga);
}
// get User by project id 

function* getUserByProjectIdSaga(action) {
    const {idProject} = action;
    //Gọi API
    try {
        const { data, status } = yield call(() => userService.getUserByProjectId(idProject));

        if (status === 200){
            yield put({
                 type: GET_USER_BY_PROJECT,
                 arrUser:data.content
            })
            
         }

    } catch (error) {
        console.log(error)
        if(error.response?.data.statusCode === 404){ 
            yield put({
                type: GET_USER_BY_PROJECT,
                arrUser:[]
           })
        }
    }
}
export function* theoDoigetUserByProjectIdSaga() {
    yield takeLatest(GET_USER_BY_PROJECT_SAGA, getUserByProjectIdSaga);
}
