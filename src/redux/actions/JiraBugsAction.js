import { USER_SIGNIN_API } from "../types/Jirabugs/JirabugsType"

export const signinJirabugsAction = ( email, password) => {
    return {
        type: USER_SIGNIN_API,
        userLogin: {
            email: email,
            password: password,
        }
    }
}