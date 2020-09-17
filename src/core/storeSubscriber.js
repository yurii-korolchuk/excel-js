import {areEqual} from 'core/utils/utils'

export class StoreSubscriber {
    constructor(store) {
        this.store = store
        this.unsub = null
        this.prevState = store.getState()
    }

    subscribeComponents(components) {
        this.unsub = this.store.subscribe(state => {
            Object.keys(state).forEach(key => {
                if (!areEqual(this.prevState[key], state[key])) {
                    components.forEach(component => {
                        if (component.subscribers.includes(key)) {
                            const data = {[key]: state[key]}
                            component.storeChanged(data)
                        }
                    })
                }
            })
            this.prevState = state
        })
    }

    unsubscribeComponents() {
        this.unsub.unsubscribe()
    }
}