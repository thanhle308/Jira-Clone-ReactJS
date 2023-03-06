import { baseService } from "./baseService";

export class TaskService extends baseService {
    constructor() {
        super();
    }
    createTask = (TaskObject) => {
        return this.post(`Project/createTask`,TaskObject)
    }
   
}
export const taskService = new TaskService();