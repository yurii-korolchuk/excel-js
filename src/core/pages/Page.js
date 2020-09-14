export class Page {
    constructor(params) {
        this.params = params
    }

    getRoot() {
        throw new Error(`No implementation provided for getRoot method in ${this}`)
    }

    afterRender() {}
    destroy() {}
}