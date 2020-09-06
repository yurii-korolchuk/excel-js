import {DomListener} from "core/DomListener";

export class ExcelComponent extends DomListener {
    constructor(root, options = {}) {
        super(root, options)
        this.observer = options.observer
    }

    toHTML() {
        return ''
    }

    init() {
        this.initDomListeners()
    }

    destroy() {
        this.removeDomListeners()
        if (this.unsubscribe) {
            this.unsubscribe()
        }
    }
}