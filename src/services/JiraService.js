import axios from "axios"
import { ACCESS_TOKEN, DOMAIN_JIRA, TOKEN_CYBER } from "../util/setting"

export const jiraService = {
    signinJira: (userLogin) => {
        return axios({
            url: `${DOMAIN_JIRA}/Users/signin`,
            method: 'POST',
            data: userLogin
        })
    },

    getAllProjectCategory: () => {
        return axios({
            url: `${DOMAIN_JIRA}/ProjectCategory`,
            method: 'GET',
        })
    },

    createProject: (newProject) => {
        return axios({
            url: `${DOMAIN_JIRA}/Project/createProject`,
            method: 'POST',
            data: newProject
        })
    },
    createProjectAuthorization: (newProject) => {
        console.log(localStorage.getItem(ACCESS_TOKEN))
        return axios({
            url: `${DOMAIN_JIRA}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
                'TokenCybersoft': TOKEN_CYBER
            }
        })
    },
    getListProject: () => {
        return axios({
            url: `${DOMAIN_JIRA}/Project/getAllProject`,
            method: 'GET',
            headers: {
                'TokenCybersoft': TOKEN_CYBER
            }
        })
    },
    updateProject : (projectUpdate) => {
        return axios({
            url: `${DOMAIN_JIRA}/Project/updateProject?projectID=${projectUpdate.id}`,
            method: 'PUT',
            data: projectUpdate,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
                'TokenCybersoft': TOKEN_CYBER
            }
        })
    }

}