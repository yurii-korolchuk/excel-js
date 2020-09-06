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
        this.listeners[event].push(callback)
        return () => {
            this.listeners =
                this.listeners[event].filter(listener => listener !== callback)
        }
    }
}
