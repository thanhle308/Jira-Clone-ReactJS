import { baseService } from "./baseService";

export class ProjectService extends baseService {
    constructor() {
        super();
    }

    deleteProject = (id) => {
        return this.delete(`Project/deleteProject?projectID=${id}`);
    }
}
export const projectService = new ProjectService();