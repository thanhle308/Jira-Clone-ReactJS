import { baseService } from "./baseService";

export class ProjectService extends baseService {
    constructor() {
        super();
    }

    deleteProject = (id) => {
        return this.delete(`Project/deleteProject?projectID=${id}`);
    }
    deleteUserFromProject = (userProject) => {
        return this.post(`Project/removeUserFromProject`,userProject);
    }
    getProjectDetail = (projectId) => {
        return this.get(`Project/getProjectDetail?id=${projectId}`);
    }
    getAllProject = () => {
        return this.get(`Project/getAllProject`);
    }
}
export const projectService = new ProjectService();