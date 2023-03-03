import { USER_LOGIN } from "../../util/setting";
import { GET_USER_SEARCH, USLOGIN } from "../types/Jirabugs/JirabugsType";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin : usLogin,
    userSearch : [],
}
export const UserLoginJiraReducer = (state = stateDefault,action) => {
    switch(action.type) {
        case USLOGIN: {
            state.userLogin = action.usLogin;
            return {...state}
        }
        case GET_USER_SEARCH :{
            state.userSearch = action.listUsers;
            return {...state}
        }
        default: return {...state};
    }
}