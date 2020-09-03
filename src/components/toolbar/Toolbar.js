import {ExcelComponent} from "core/ExcelComponent";

export class Toolbar extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Toolbar',
            listeners: ['click']
        })
    }
    static className = 'toolbar'

    onClick() {}

    toHTML() {
        return `
            <div class="toolbar__text-align">
                <button class="toolbar__text-align-left">
                    <span class="material-icons">format_align_left</span>
                </button>
                <button class="toolbar__text-align-center">
                    <span class="material-icons">format_align_center</span>
                </button>
                <button class="toolbar__text-align-right">
                    <span class="material-icons">format_align_right</span>
                </button>
            </div>
            <div class="toolbar__text-decoration">
                <button class="toolbar__format-bold">
                    <span class="material-icons">format_bold</span>
                </button>
                <button class="toolbar__format-italic">
                    <span class="material-icons">format_italic</span>
                </button>
                <button class="toolbar__format-underline">
                    <span class="material-icons">format_underlined</span>
                </button>
            </div>
        `
    }
}