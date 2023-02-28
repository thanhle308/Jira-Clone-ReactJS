import { all } from "redux-saga/effects";
import * as Jirabugs from './Jirabugs/UserJirabugsSaga';


export function* rootSaga() {
    yield all([
        //Nghiệp vụ Jirabug (tự đặt tên gì cũng được)
        Jirabugs.theoDoiSignin()
    ])

}