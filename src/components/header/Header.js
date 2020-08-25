import {ExcelComponent} from "core/ExcelComponent";

export class Header extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Header',
            listeners: ['input', 'click']
        })
    }

    static className = 'header'

    onInput() {}
    onClick() {}
}