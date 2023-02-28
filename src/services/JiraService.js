import axios from "axios"
import { DOMAIN_JIRA } from "../util/setting"

export const jiraService = {
    signinJira: (userLogin) => {
      return  axios({
            url:`${DOMAIN_JIRA}/Users/signin`,
            method: 'POST',
            data : userLogin
        })
    }
}