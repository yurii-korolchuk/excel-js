import {ExcelComponent} from "core/ExcelComponent";
import {$} from "core/dom";
import {createTable, stringFromChar} from "@/components/table/table.template";
import {TableSelection} from "@/components/table/TableSelection";
import {isCell, shouldResize} from "@/components/table/table.functions";
import {range, numberFromChar} from "@/components/table/table.functions";
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
        } else if (isCell(event, 'contenteditable')) {
            const target = $(event.target)
            if (event.ctrlKey) {
                this.selection.selectGroup(target)
            } else if (event.shiftKey) {
                const current = this.selection.current

                const startCol = numberFromChar(current.data.cellInfo)
                const endCol = numberFromChar(target.data.cellInfo)
                const startRow = +current.data.cellIndex
                const endRow = +target.data.cellIndex

                const cols = range(startCol, endCol)
                const rows = range(startRow, endRow)
                const ids = []

                cols.map(el => {
                    rows.forEach(row => {
                        ids.push(`${String.fromCharCode(+el)}${+row}`)
                    })
                })

                const idsmap = ids.map(el => {
                    return this.root.find(`[data-id="${el}"]`)
                })

                this.selection.createSelection(idsmap)
            } else {
                this.selection.select(target)
            }
        }
    }

    toHTML() {
        return createTable()
    }
}