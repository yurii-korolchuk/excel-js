import {
    HEADER_INPUT,
    TABLE_INPUT,
    TABLE_RESIZE,
    TABLE_STYLE
} from "@/redux/types";

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
        case TABLE_STYLE:
            newState = state.cellStyle || {}
            newState[action.data.id] = {
                ...newState[action.data.id],
                ...action.data.style
            }
            return {...state, cellStyle: newState}
        case HEADER_INPUT:
            return {...state, headerName: action.data}
        default:
            return JSON.parse(JSON.stringify(state))
    }
}