import { GET_ALL_PROJECT, GET_LIST_PROJECT } from "../types/Jirabugs/JirabugsType"

const stateDefault = {
    projectList: [],
    arrProjects: [], //get all projects cho dropdown
}

export const ProjectJiraReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_LIST_PROJECT: {
            state.projectList = action.projectList; 
            return { ...state };
        }
        case GET_ALL_PROJECT : {
            state.arrProjects = action.arrProjects;
            return { ...state };
        }
        default:
            return { ...state }
    }
}