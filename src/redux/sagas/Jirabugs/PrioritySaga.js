
import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { priorityService } from '../../../services/PriorityService';
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from '../../types/Jirabugs/PriorityType';


function * getAllPrioritySaga (action) {
    try {
        const {data ,status} = yield call(()=> priorityService.getAllPriority());
        yield put({
            type : GET_ALL_PRIORITY,
            arrPriority : data.content
        }) 
    } catch (error) {
        console.log(error);
    }
}

export function * theoDoigetAllPrioritySaga() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA,getAllPrioritySaga)
}