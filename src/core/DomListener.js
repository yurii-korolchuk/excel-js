import {capitalize} from "core/utils";

export class DomListener {
    constructor(root, {name = '', listeners = []} = {}) {
        if (!root) throw new Error('No root provided for DomListener')
        this.root = root
        this.listeners = listeners
        this.name = name
    }

    initDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(capitalize(listener))
            if (!this[method]) {
                const name = `in ${this.name}`
                const message = `No implementation provided for ${method} ${name}`
                throw new Error(message)
            }
            this[method] = this[method].bind(this)
            this.root.on(listener, this[method])
        })
    }

    removeDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(capitalize(listener))
            this.root.off(listener, this[method])
        })
    }
}

const getMethodName = (string) => {
    return 'on' + string
}