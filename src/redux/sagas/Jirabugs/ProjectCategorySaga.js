import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../../services/JiraService'
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../types/Jirabugs/JirabugsType';

function* getAllProjectCategory(action) {
    // console.log('actionSaga', action)
    try {
        //Goi api lay du lieu ve
        const { data, status } = yield call(() => jiraService.getAllProjectCategory());
        //goi thanh cong thi dispatch len reducer thong qua put
        if (status === 200){
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content
            })
            console.log(data)
        }
        
    } catch (error) {
        console.log(error.response.data)
    }

}


export function* theoDoigetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategory);
}