import {$} from "core/dom";
import {ActiveRoute} from "core/routing/ActiveRoute";

export class Router {
    constructor(selector = '', routes) {
        if (!selector || document.querySelector(selector) === null) {
            throw new Error('Please provide a valid placeholder for Router')
        } else {
            this.placeholder = $(selector)
            this.routes = routes
            this.handleHashChange = this.handleHashChange.bind(this)
            this.init()
        }
    }

    handleHashChange(event) {
        const PageClass = this.routes.excel
        const page = new PageClass()
        this.placeholder.append(page.getRoot())
        page.afterRender()
    }

    init() {
        window.addEventListener('hashchange', this.handleHashChange)
    }

    destroy() {
        window.removeEventListener('hashchange', this.handleHashChange)
    }
}