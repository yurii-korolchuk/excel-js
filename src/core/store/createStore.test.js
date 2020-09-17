import {createStore} from './createStore'

const initialState = {
    count: 0
}

const reducer = (state = {...initialState}, action) => {
    if (action.type === 'ADD_ONE') {
        return {
            ...state,
            count: state.count + 1
        }
    }
    return state
}

describe('createStore', () => {
    let store
    let handler

    beforeEach(() => {
        store = createStore(reducer, initialState)
        handler = jest.fn()
    })

    test('should return store object', () => {
        expect(store).toBeDefined()
        expect(store.subscribe).toBeDefined()
        expect(store.dispatch).toBeDefined()
        expect(store.getState).toBeDefined()
    })

    test('should return state as an object', () => {
        expect(store.getState()).toBeInstanceOf(Object)
    })

    test('should return default state', () => {
        expect(store.getState()).toEqual({...initialState})
        expect(store.getState().count).toBe(0)
    })

    test('should return state with count + 1', () => {
        store.dispatch({type: 'ADD_ONE'})
        expect(store.getState().count).toBe(1)
    })

    test('should not change state if action doesn\'t exist', () => {
        store.dispatch({type: 'NOT_EXISTING_ACTION_TYPE'})
        expect(store.getState().count).toBe(0)
    })

    test('should call subscriber function', () => {
        store.subscribe(handler)
        store.dispatch({type: 'ADD_ONE'})
        expect(handler).toBeCalled()
        expect(handler).toBeCalledWith(store.getState())
    })

    test('should not call subscriber function if unsubscribed', () => {
        const unsub = store.subscribe(handler)
        unsub.unsubscribe()
        store.dispatch({type: 'ADD_ONE'})
        expect(handler).not.toBeCalled()
    })
})