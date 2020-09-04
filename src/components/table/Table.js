import {ExcelComponent} from "core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "core/dom";
import {TableSelection} from "@/components/table/TableSelection";
import {isCell, shouldResize} from "@/components/table/table.functions";
import {resize} from "@/components/table/table.functions"

export class Table extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Table',
            listeners: ['mousedown'],
            ...options
        })
    }
    static className = 'table'

    init() {
        super.init()
        this.selection = new TableSelection()
        this.selection.select(this.root.find('[data-id="A1"]'))
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resize(this, event)
        } else if (isCell(event)) {
            const target = $(event.target)
            if (event.ctrlKey) {
                this.selection.selectGroup(target)
            } else {
                this.selection.select(target)
            }
        }
    }

    toHTML() {
        return createTable()
    }
}