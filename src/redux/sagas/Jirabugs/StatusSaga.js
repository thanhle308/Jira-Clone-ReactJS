import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { statusService } from '../../../services/StatusService';
import { notifiFunction } from '../../../util/Notification/notification';
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from '../../types/Jirabugs/StatusType';


function * getAllStatusSaga (action) {
    try {
        const {data ,status} = yield call(()=> statusService.getAllStatus());
        yield put({
            type: GET_ALL_STATUS,
            arrStatus :data.content
        })
    } catch (error) {
        console.log(error);
    }
  
}

export function * theoDoigetAllStatusSaga() {
    yield takeLatest(GET_ALL_STATUS_SAGA,getAllStatusSaga)
}