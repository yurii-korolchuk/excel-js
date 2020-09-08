export const createStore = (reducer, initialState = {colState: {}, rowState: {}}) => {
    let state = reducer({...initialState}, {type: '__INIT__'})
    let listeners = []

    return {
        subscribe(fn) {
            listeners = [...listeners, fn]
            return {
                unsubscribe() {
                    listeners = listeners.filter(listen => listen !== fn)
                }
            }
        },

        dispatch(action) {
            state = reducer(state, action)
            listeners.forEach(listener => listener(state))
        },

        getState() {
            return state
        }
    }
}