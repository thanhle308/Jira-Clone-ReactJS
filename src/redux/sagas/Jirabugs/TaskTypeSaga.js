import { taskTypeService } from "../../../services/TaskTypeService";
import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../../types/Jirabugs/TaskType";


function * getAllTaskTypeSaga (action) {
    try {
        const {data ,status} = yield call(()=> taskTypeService.getAllTaskType());
        yield put({
            type : GET_ALL_TASK_TYPE,
            arrTaskTypes : data.content
        }) 
    } catch (error) {
        console.log(error);
    }
}

export function * theoDoigetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA,getAllTaskTypeSaga)
}