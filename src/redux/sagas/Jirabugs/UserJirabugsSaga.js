import axios from "axios";
import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from "../../../services/JiraService";
import { ACCESS_TOKEN, USER_LOGIN } from "../../../util/setting";
import { USER_SIGNIN_API, USLOGIN } from "../../types/Jirabugs/JirabugsType";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingType";
import { history } from "../../../App";
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
            type :USLOGIN,
            userLogin: data.content
        })

        console.log(data)
        history.push('/home');

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