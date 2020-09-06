import {$} from 'core/dom'
import {Observer} from "core/Observer";

export class Excel {
    constructor(containerSelector, {components = []} = {}) {
        this.container = $(containerSelector)
        this.components = components;
        this.observer = new Observer()
    }

    getRoot() {
        const root = $.create('div', 'excel')
        const observer = {observer: this.observer}
        this.components = this.components.map(Component => {
            const el = $.create('div', Component.className)
            const component = new Component(el, observer)
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
}