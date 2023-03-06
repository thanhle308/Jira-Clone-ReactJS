import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { taskService } from '../../../services/TaskService';
import { notifiFunction } from '../../../util/Notification/notification';
import { CREATE_TASK, CREATE_TASK_SAGA } from '../../types/Jirabugs/TaskType';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../types/LoadingType';


function * createTaskSaga (action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const {data ,status} = yield call(()=> taskService.createTask(action.TaskObject));
        notifiFunction('success', 'Create Task is successful !');
    } catch (error) {
        console.log(error);
        notifiFunction('error', 'Create Task is fail !');
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoicreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA,createTaskSaga)
}