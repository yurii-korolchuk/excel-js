import {$} from 'core/dom'

export class Excel {
    constructor(containerSelector, {components = []} = {}) {
        this.container = document.querySelector(containerSelector)
        this.components = components;
    }

    getRoot() {
        const root = $.create('div', 'excel')
        this.components.forEach(Component => {
            root.append($.create('div', Component.className))
        })
        return root
    }

    render() {
        this.container.appendChild(this.getRoot())
    }
}