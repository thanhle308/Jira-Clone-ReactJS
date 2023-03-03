
const stateDefault = {
    projectEdit: {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "string",
        "categoryId": 3
      }
}

export const ProjectEditReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'EDIT_PROJECT': {
            state.projectEdit = action.projectEditModal;
            return {...state}
        }
        default:
            return { ...state }
    }
}