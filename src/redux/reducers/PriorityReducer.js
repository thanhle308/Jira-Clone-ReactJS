import { GET_ALL_PRIORITY } from "../types/Jirabugs/PriorityType";


const initialState = {
    arrPriority:[],
}

export const PriorityReducer =  (state = initialState, action) => {
  switch (action.type) {
  case GET_ALL_PRIORITY:
    state.arrPriority = action.arrPriority;
    return { ...state}

  default:
    return state
  }
}
