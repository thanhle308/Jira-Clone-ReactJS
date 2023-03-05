import { GET_ALL_TASK_TYPE } from "../types/Jirabugs/TaskType"

const initialState = {
    arrTaskTypes:[],
}

export const TaskTypeReducer =  (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_TASK_TYPE:
    state.arrTaskTypes = action.arrTaskTypes;
    return { ...state}

  default:
    return state
  }
}
