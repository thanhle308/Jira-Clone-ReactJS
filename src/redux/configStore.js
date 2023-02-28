import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
//middleware
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from "./sagas/rootSaga";
import { LoadingReducer } from "./reducers/LoadingReducer";
import { UserLoginJiraReducer } from "./reducers/UserJiraReducer";

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    LoadingReducer,
    UserLoginJiraReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk, middleWareSaga));
//Goi Saga
middleWareSaga.run(rootSaga);
