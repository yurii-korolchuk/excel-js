export class ActiveRoute {
    static get hash() {
        return window.location.hash
    }

    static param(number) {
        const param = this.hash.split('/')[number]
        if (number === 0) {
            return param.slice(1)
        } else {
            return param
        }
    }

    static navigate(path = '') {
        if (typeof path === 'string') {
            window.location.hash = path
        }
    }
}