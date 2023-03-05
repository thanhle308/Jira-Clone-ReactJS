import { all } from "redux-saga/effects";
import * as Jirabugs from './Jirabugs/UserJirabugsSaga';
import * as ProjectCategorySaga from './Jirabugs/ProjectCategorySaga';
import * as ProjectSaga from './Jirabugs/ProjectSaga';
import * as TaskTypeSaga from './Jirabugs/TaskTypeSaga';
import * as PrioritySaga from './Jirabugs/PrioritySaga';

export function* rootSaga() {
    yield all([
        //Nghiệp vụ Jirabug (tự đặt tên gì cũng được)
        Jirabugs.theoDoiSignin(),
        Jirabugs.theoDoigetUser(),
        Jirabugs.theoDoiaddUserProjectSaga(),
        Jirabugs.theoDoiremoveUserProjectSaga(),
        ProjectCategorySaga.theoDoigetAllProjectCategory(),
        ProjectSaga.theoDoicreateProjectSaga(),
        ProjectSaga.theoDoigetListProjectSaga(),
        ProjectSaga.theoDoiupdateProjectSaga(),
        ProjectSaga.theoDoideleteProjectSaga(),
        ProjectSaga.theoDoigetProjectDetailSaga(),
        ProjectSaga.theoDoigetAllProjectSaga(),
        TaskTypeSaga.theoDoigetAllTaskTypeSaga(),
        PrioritySaga.theoDoigetAllPrioritySaga(),
    ])

}