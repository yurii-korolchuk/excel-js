import {$} from 'core/dom'
import {Observer} from "core/Observer";

export class Excel {
    constructor(containerSelector, {components = []} = {}, store = {}) {
        this.container = $(containerSelector)
        this.components = components;
        this.observer = new Observer()
        this.store = store
    }

    getRoot() {
        const root = $.create('div', 'excel')
        const componentOptions = {
            observer: this.observer,
            store: this.store
        }
        this.components = this.components.map(Component => {
            const el = $.create('div', Component.className)
            const component = new Component(el, componentOptions)
            el.html(component.toHTML())
            root.append(el)
            return component
        })
        return root.el
    }

    render() {
        this.container.append(this.getRoot())
        this.components.forEach(component => component.init())
    }

    destroy() {
        this.components.forEach(component => {
            component.destroy()
        })
    }
}