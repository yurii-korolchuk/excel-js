import {ExcelComponent} from "core/ExcelComponent";
import {createTable} from "@/components/table/table.template";

export class Table extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Table',
            listeners: ['mousedown', 'mousemove', 'mouseup']
        })
    }
    static className = 'table'

    onMousedown() {
        console.log('down')
    }
    onMousemove() {
        console.log('mouseMove')
    }

    onMouseup() {}
    toHTML() {
        return createTable()
    }
}