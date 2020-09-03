import {ExcelComponent} from "core/ExcelComponent";

export class Header extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    static className = 'header'

    onInput() {}
    onClick() {}

    toHTML() {
        return `
            <div class="header__name">
                <span class="material-icons">description</span>
                <input type="text" value="Новая таблица" >
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