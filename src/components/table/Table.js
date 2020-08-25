import {ExcelComponent} from "core/ExcelComponent";
import {createTable} from "@/components/table/table.template";

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

    toHTML() {
        return createTable()
    }
}