import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../../services/JiraService'
import { projectService } from '../../../services/ProjectService';
import { notifiFunction } from '../../../util/Notification/notification';
import { GET_PROJECT_DETAIL_SAGA, CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA, UPDATE_PROJECT_SAGA, GET_ALL_PROJECT_SAGA, GET_ALL_PROJECT } from '../../types/Jirabugs/JirabugsType';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../types/LoadingType';
import { history } from "../../../App";

function* createProjectSaga(action) {
    //Hien thi loading
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        //Goi api lay du lieu ve
        const { data, status } = yield call(() => jiraService.createProjectAuthorization(action.newProject));
        //goi thanh cong thi dispatch len reducer thong qua put
        if (status === 200) {
            console.log(data)
        }
        history.push('/');
    } catch (error) {
        console.log(error.response.data)
    }

    yield put({
        type: HIDE_LOADING
    })

}


export function* theoDoicreateProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}
// ~~~~~~~~~~~~~~~~~~~~get list~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function* getListProjectSaga() {
    try {
        //Sau khi lay du lieu thanh cong thi dispatch len reducer
        const { data, status } = yield call(() => jiraService.getListProject())
        if (status === 200) {
            yield put({
                type: GET_LIST_PROJECT,
                projectList: data.content,
            })
        }
    } catch (error) {
        console.log(error.response.data)
    }

}
export function* theoDoigetListProjectSaga(action) {
    yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}

// Update Project 

function* updateProjectSaga(action) {
    //Hien thi loading
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        //Sau khi lay du lieu thanh cong thi dispatch len reducer
        const { data, status } = yield call(() => jiraService.updateProject(action.projectUpdate))
        console.log('stat', status);
        if (status === 200) {
            yield put({
                type: GET_LIST_PROJECT_SAGA,
            })
            notifiFunction('success', 'Edit project is successful !');
        } 

    } catch (error) {
        console.log(error.response.data)
        notifiFunction('error', 'Edit project is Fail !');
    }
    yield put({
        type: HIDE_LOADING
    })

}
export function* theoDoiupdateProjectSaga() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

// DELETE PROJECT 

function* deleteProjectSaga(action) {
    //Hien thi loading
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        //Sau khi lay du lieu thanh cong thi dispatch len reducer
        const { data, status } = yield call(() => projectService.deleteProject(action.idProject))
        if (status === 200) {
            yield put({
                type: GET_LIST_PROJECT_SAGA,
            })
            notifiFunction('success', 'Delete project is successful !');
        }
    } catch (error) {
        console.log(error.response.data)
        if (error.response.data.statusCode === 403) {
            notifiFunction('error', 'Bạn không có quyền delete project !!');
        }

    }
    yield put({
        type: HIDE_LOADING
    })

}
export function* theoDoideleteProjectSaga() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}
// Project Detail

function* getProjectDetailSaga(action) {
    //Hien thi loading
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        //Sau khi lay du lieu thanh cong thi dispatch len reducer
        const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId))
        console.log('detail',data);
        //lay du lieu thanh cong thi dua len redux
        yield put({
            type: 'PUT_PROJECT_DETAIL',
            projectDetail: data.content
        })
    } catch (error) {
        console.log(error.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })

}
export function* theoDoigetProjectDetailSaga() {
    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}

// GET ALL PROJECT 

function* getAllProjectSaga(action) {
    try {
        //Sau khi lay du lieu thanh cong thi dispatch len reducer
        const { data, status } = yield call(() => projectService.getAllProject());

        yield put({
            type: GET_ALL_PROJECT,
            arrProjects: data.content
        })

    } catch (error) {
        console.log('404 not  found !');
        history.push(`/projectmanagement`);
    }

}
export function* theoDoigetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}