import {$} from 'core/dom/dom'
import {Observer} from 'core/observer/Observer'
import {StoreSubscriber} from 'core/storeSubscriber'
import {changeTime} from '@/redux/actions'

export class Excel {
    constructor({components = []} = {}, store = {}) {
        this.components = components;
        this.observer = new Observer()
        this.store = store
        this.storeSubscriber = new StoreSubscriber(this.store)
    }

    getRoot() {
        const root = $.create('div', 'excel')
        const componentOptions = {
            observer: this.observer,
            store: this.store,
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
        this.components.forEach(component => component.init())
        this.storeSubscriber.subscribeComponents(this.components)
        this.store.dispatch(changeTime())
    }

    destroy() {
        this.components.forEach(component => {
            component.destroy()
        })
        this.storeSubscriber.unsubscribeComponents()
    }
}