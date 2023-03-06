import {  baseService } from "./baseService";

export class UserService extends baseService {
    constructor() {
        super();
    }

    getUser = (keyword) => {
        return this.get(`Users/getUser?keyword=${keyword}`);
    }
    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`,userProject);
    }
    getUserByProjectId = (idProject) => {
        return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
    }
}
export const userService = new UserService();