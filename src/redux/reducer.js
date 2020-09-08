import {TABLE_RESIZE} from "@/redux/types";

export const reducer = (state, action) => {
    let newState
    switch (action.type) {
        case TABLE_RESIZE:
            if (action.data.isColResize) {
                newState = state.colState || {}
                newState[action.data.id] = action.data.value
                return {...state, colState: newState}
            } else {
                newState = state.rowState || {}
                newState[action.data.id] = action.data.value
                return {...state, rowState: newState}
            }
        default:
            return state
    }
}