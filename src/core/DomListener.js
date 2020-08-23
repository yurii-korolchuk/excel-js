import {capitalize} from "core/utils";

export class DomListener {
    constructor(root, {listeners = []} = {}) {
        if (!root) throw new Error('No root provided for DomListener')
        this.root = root
        this.listeners = listeners
    }

    initDomListeners() {
        this.listeners.forEach(listener => {
            const eventFunc = getMethodName(capitalize(listener))
            this.root.on(listener, this[eventFunc].bind(this))
        })
    }

    removeDomListeners() {}
}

const getMethodName = (string) => {
    return 'on' + string
}