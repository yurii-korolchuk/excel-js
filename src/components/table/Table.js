import {ExcelComponent} from "core/ExcelComponent";

export class Table extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Table',
            listeners: ['input', 'click']
        })
    }
    static className = 'table'

    onInput() {}
    onClick() {}
}