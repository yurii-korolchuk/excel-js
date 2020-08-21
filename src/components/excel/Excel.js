import {$} from 'core/dom'

export class Excel {
    constructor(containerSelector, {components = []} = {}) {
        this.container = $(containerSelector)
        this.components = components;
    }

    getRoot() {
        const root = $.create('div', 'excel')
        this.components.forEach(Component => {
            root.append($.create('div', Component.className))
        })
        return root.el
    }

    render() {
        this.container.append(this.getRoot())
    }
}