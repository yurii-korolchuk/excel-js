import {ExcelComponent} from 'core/ExcelComponent'
import * as actions from '@/redux/actions'
import {$} from 'core/dom/dom'
import {ActiveRoute} from 'core/routing/ActiveRoute'

export class Header extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options,
        })
    }

    static className = 'header'

    onInput(event) {
        const target = event.target
        if (target.dataset.changeable) {
            this.$dispatch(actions.headerInput(target.value))
        }
    }
    onClick(event) {
        const target = $(event.target)
        if (target.data.exit) {
            ActiveRoute.navigate('')
        } else if (target.data.delete) {
            const id = target.id
            localStorage.removeItem(`excel-state-${id}`)
            this.destroy()
            ActiveRoute.navigate('')
        }
    }

    toHTML() {
        const name = this.store.getState().headerName || 'Новая таблица'
        return `
            <div class="header__name">
                <span class="material-icons">description</span>
                <input type="text" data-changeable="true" value="${name}">
            </div>
            <div class="header__buttons">
                <button class="delete" data-delete="true">
                    <span class="material-icons" 
                          data-delete="true"
                          data-id="${this.store.getState().id}"
                          >delete_forever
                    </span>
                </button>

                <button class="exit" data-exit="true">
                    <span class="material-icons"
                          data-exit="true"
                          >exit_to_app
                    </span>
                </button>
            </div>
        `
    }
}