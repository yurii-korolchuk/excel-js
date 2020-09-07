import {DomListener} from "core/DomListener";

export class ExcelComponent extends DomListener {
    constructor(root, options = {}) {
        super(root, options)
        this.observer = options.observer
        this.store = options.store
        this.unsubscribe = []
    }

    toHTML() {
        return ''
    }

    $trigger(event, ...args) {
        this.observer.trigger(event, ...args)
    }

    $observe(event, fn) {
        const unsub = this.observer.subscribe(event, fn)
        this.unsubscribe = [...this.unsubscribe, unsub]
    }

    $subscribe(fn) {
        this.store.subscribe(fn)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    init() {
        this.initDomListeners()
    }

    destroy() {
        this.removeDomListeners()
        if (this.unsubscribe.length) {
            this.unsubscribe.forEach(unsub => {
                unsub()
            })
        }
    }
}