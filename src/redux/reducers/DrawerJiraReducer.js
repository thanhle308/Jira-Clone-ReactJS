const initialState = {
    title: "",
    visible: false,
    ComponentContentDrawer : <p>default content</p>,
    callBackSubmit : (propsValue) => {alert("Submit")},
}

export const drawerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_DRAWER':
            return { ...state, visible: true }
        case 'CLOSE_DRAWER':
            return { ...state, visible: false }
        case 'OPEN_FORM_EDIT_PROJECT': {
            return { ...state, visible: true,ComponentContentDrawer:action.Component ,title : action.title}
        }
        case 'SET_SUBMIT_EDIT_PROJECT': {
            state.callBackSubmit = action.submitFunction;
            return {...state}
        }
        case 'OPEN_FORM_CREATE_TASK' : {
            state.visible = true;
            state.ComponentContentDrawer = action.Component;
            state.title = action.title;
            return { ...state}
        }
        case 'SET_SUBMIT_CREATE_TASK': {
            return { ...state, callBackSubmit: action.submitFunction}
        }

        default:
            return state
    }
}
