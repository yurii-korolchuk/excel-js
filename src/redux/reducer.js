export const reducer = (state, action) => {
    let newState
    switch (action.type) {
        case 'TABLE_RESIZE':
            newState = state.colState || {}
            newState[action.data.id] = action.data.value
            return {...state, colState: newState}
        default:
            return state
    }
}