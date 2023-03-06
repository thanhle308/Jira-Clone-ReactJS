import { all } from "redux-saga/effects";
import * as Jirabugs from './Jirabugs/UserJirabugsSaga';
import * as ProjectCategorySaga from './Jirabugs/ProjectCategorySaga';
import * as ProjectSaga from './Jirabugs/ProjectSaga';
import * as TaskTypeSaga from './Jirabugs/TaskTypeSaga';
import * as PrioritySaga from './Jirabugs/PrioritySaga';
import * as TaskSaga from './Jirabugs/TaskSaga';
import * as StatusSaga from './Jirabugs/StatusSaga';
//Nghiệp vụ Jirabug (tự đặt tên gì cũng được)


export function* rootSaga() {
    yield all([
        
        Jirabugs.theoDoiSignin(),
        Jirabugs.theoDoigetUser(),
        Jirabugs.theoDoiaddUserProjectSaga(),
        Jirabugs.theoDoiremoveUserProjectSaga(),
        Jirabugs.theoDoigetUserByProjectIdSaga(),
        ProjectCategorySaga.theoDoigetAllProjectCategory(),
        ProjectSaga.theoDoicreateProjectSaga(),
        ProjectSaga.theoDoigetListProjectSaga(),
        ProjectSaga.theoDoiupdateProjectSaga(),
        ProjectSaga.theoDoideleteProjectSaga(),
        ProjectSaga.theoDoigetProjectDetailSaga(),
        ProjectSaga.theoDoigetAllProjectSaga(),
        TaskTypeSaga.theoDoigetAllTaskTypeSaga(),
        PrioritySaga.theoDoigetAllPrioritySaga(),
        TaskSaga.theoDoicreateTaskSaga(),
        StatusSaga.theoDoigetAllStatusSaga(),
    ])

}