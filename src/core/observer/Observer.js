export class Observer {
    constructor() {
        this.listeners = {}
    }

    trigger(event, ...args) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(listener => {
                listener(...args)
            })
            return true
        } else {
            return false
        }
    }

    subscribe(event, callback) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event] = [...this.listeners[event], callback]
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== callback)
        }
    }
}
