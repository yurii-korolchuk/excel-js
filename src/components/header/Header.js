import {ExcelComponent} from "core/ExcelComponent"
import * as actions from '@/redux/actions'

export class Header extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    static className = 'header'

    onInput(event) {
        const target = event.target
        if (target.dataset.changeable) {
            this.$dispatch(actions.headerInput(target.value))
        }
    }
    onClick() {}

    toHTML() {
        const name = this.store.getState().headerName || 'Новая таблица'
        return `
            <div class="header__name">
                <span class="material-icons">description</span>
                <input type="text" data-changeable="true" value="${name}">
            </div>
            <div class="header__buttons">
                <button class="delete">
                    <span class="material-icons">delete_forever</span>
                </button>

                <button class="exit">
                    <span class="material-icons">exit_to_app</span>
                </button>
            </div>
        `
    }
}