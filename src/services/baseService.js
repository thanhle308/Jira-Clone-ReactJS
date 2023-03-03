import axios from "axios";
import { ACCESS_TOKEN, DOMAIN_JIRA, TOKEN_CYBER } from "../util/setting";

export class baseService {
    put = (url, model) => {
        return axios({
            url: `${DOMAIN_JIRA}/${url}`,
            method: 'PUT',
            data: model,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
                'TokenCybersoft': TOKEN_CYBER
            }
        })
    }
    post = (url, model) => {
        return axios({
            url: `${DOMAIN_JIRA}/${url}`,
            method: 'POST',
            data: model,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
                'TokenCybersoft': TOKEN_CYBER
            }
        })
    }
    get = (url) => {
        return axios({
            url: `${DOMAIN_JIRA}/${url}`,
            method: 'GET',         
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
                'TokenCybersoft': TOKEN_CYBER
            }
        })
    }
    delete = (url) => {
        return axios({
            url: `${DOMAIN_JIRA}/${url}`,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
                'TokenCybersoft': TOKEN_CYBER
            }
        })
    }
}
export const BaseService = new baseService();