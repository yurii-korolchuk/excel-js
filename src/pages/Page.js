export class Page {
    constructor(params) {
        this.params = params
    }

    getRoot() {
        const msg = `No implementation provided for getRoot method in ${this}`
        throw new Error(msg)
    }

    afterRender() {}
    destroy() {}
}