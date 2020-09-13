export class ActiveRoute {
    static get hash() {
        return window.location.hash
    }

    static get param() {
        return this.hash.split('/')
    }
}