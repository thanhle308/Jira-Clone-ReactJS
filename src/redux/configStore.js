import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
//middleware
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from "./sagas/rootSaga";
import { LoadingReducer } from "./reducers/LoadingReducer";
import { UserLoginJiraReducer } from "./reducers/UserJiraReducer";
import { ProjectCategoryReducer } from "./reducers/ProjectCategoryReducer";
import { ProjectJiraReducer } from "./reducers/ProjectJiraReducer";
import { drawerReducer } from "./reducers/DrawerJiraReducer";
import { ProjectEditReducer } from "./reducers/ProjectEditReducer";
import { TaskTypeReducer } from "./reducers/TaskTypeReducer";
import { PriorityReducer } from "./reducers/PriorityReducer";



const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    LoadingReducer,
    UserLoginJiraReducer,
    ProjectCategoryReducer,
    ProjectJiraReducer,
    drawerReducer,
    ProjectEditReducer,
    TaskTypeReducer,
    PriorityReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, middleWareSaga));
//Goi Saga
middleWareSaga.run(rootSaga);
