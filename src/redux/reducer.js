import {TABLE_INPUT, TABLE_RESIZE} from "@/redux/types";

export const reducer = (state, action) => {
    let newState
    let resizeType
    switch (action.type) {
        case TABLE_RESIZE:
            resizeType = action.data.isColResize ? 'colState' : 'rowState'
            newState = state[resizeType] || {}
            newState[action.data.id] = action.data.value
            return {...state, [resizeType]: newState}
        case TABLE_INPUT:
            newState = state.cellState || {}
            newState[action.data.id] = action.data.value
            return {...state, cellState: newState, currText: action.data.value}
        default:
            return state
    }
}