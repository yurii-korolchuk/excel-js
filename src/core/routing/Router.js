import {$} from 'core/dom'
import {ActiveRoute} from 'core/routing/ActiveRoute'

export class Router {
    constructor(selector = '', routes) {
        if (!selector || document.querySelector(selector) === null) {
            throw new Error('Please provide a valid placeholder for Router')
        } else {
            this.placeholder = $(selector)
            this.routes = routes
            this.page = null
            this.handleHashChange = this.handleHashChange.bind(this)
            this.handleHashChange()
            this.init()
        }
    }

    handleHashChange() {
        if (this.page) {
            this.page.destroy()
            this.placeholder.clear()
        }
        const pageType = ActiveRoute.param(0)
        if (this.routes[pageType]) {
            const PageClass = this.routes[pageType]
            this.page = new PageClass(ActiveRoute.param(1))
            this.placeholder.append(this.page.getRoot())
            this.page.afterRender()
        } else {
            this.defaultPage()
        }
    }

    init() {
        window.addEventListener('hashchange', this.handleHashChange)
    }

    defaultPage() {
        const PageClass = this.routes.dashboard
        this.page = new PageClass(ActiveRoute.param(1))
        this.placeholder.append(this.page.getRoot())
        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.handleHashChange)
    }
}