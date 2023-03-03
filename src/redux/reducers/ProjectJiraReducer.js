import { GET_LIST_PROJECT } from "../types/Jirabugs/JirabugsType"

const stateDefault = {
    projectList: []
}

export const ProjectJiraReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_LIST_PROJECT: {
            state.projectList = action.projectList; 
            return { ...state };
        }
        default:
            return { ...state }
    }
}