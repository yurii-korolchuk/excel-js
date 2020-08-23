import {$} from 'core/dom'

export class Excel {
    constructor(containerSelector, {components = []} = {}) {
        this.container = $(containerSelector)
        this.components = components;
    }

    getRoot() {
        const root = $.create('div', 'excel')
        this.components = this.components.map(Component => {
            const el = $.create('div', Component.className)
            const component = new Component(el)
            root.append(component.toHTML())
            return component
        })
        return root.el
    }

    render() {
        this.container.append(this.getRoot())
        this.components.forEach(component => component.init())
    }
}