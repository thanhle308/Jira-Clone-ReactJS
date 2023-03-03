import { all } from "redux-saga/effects";
import * as Jirabugs from './Jirabugs/UserJirabugsSaga';
import * as ProjectCategorySaga from './Jirabugs/ProjectCategorySaga';
import * as ProjectSaga from './Jirabugs/ProjectSaga';
export function* rootSaga() {
    yield all([
        //Nghiệp vụ Jirabug (tự đặt tên gì cũng được)
        Jirabugs.theoDoiSignin(),
        ProjectCategorySaga.theoDoigetAllProjectCategory(),
        ProjectSaga.theoDoicreateProjectSaga(),
        ProjectSaga.theoDoigetListProjectSaga(),
        ProjectSaga.theoDoiupdateProjectSaga(),
        ProjectSaga.theoDoideleteProjectSaga(),
        Jirabugs.theoDoigetUser(),
        Jirabugs.theoDoiaddUserProjectSaga(),
    ])

}