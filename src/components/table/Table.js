import {ExcelComponent} from "core/ExcelComponent";
import {$} from "core/dom";
import {createTable, stringFromChar} from "@/components/table/table.template";
import {TableSelection} from "@/components/table/TableSelection";
import {
    isCell,
    section,
    shouldResize
} from "@/components/table/table.functions";
import {range, numberFromChar} from "@/components/table/table.functions";
import {resize} from "@/components/table/table.functions"

export class Table extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown'],
            ...options
        })
    }
    static className = 'table'

    init() {
        super.init()
        this.selection = new TableSelection()
        const current = this.root.find('[data-id="A1"]')
        current.focus()
        this.selection.select(current)

        this.$observe('formula-input', data => {
            const value = $(data).text()
            this.selection.current.text(value)
        })

        this.$observe('formula-unfocus', event => {
            event.preventDefault()
            event.target.blur()
            this.selection.current.focus()
        })
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resize(this, event)
        } else if (isCell(event, 'contenteditable')) {
            const target = $(event.target)
            if (event.ctrlKey) {
                this.selection.selectGroup(target)
            } else if (event.shiftKey) {
                section(this, target, this.selection)
            } else {
                this.selection.select(target)
            }
        }
    }

    onKeydown(event) {
        switch (event.code) {
            case 'Tab': case 'ArrowRight':
                event.preventDefault()
                this.selection.selectNextInRow(this.root, 1)
                break
            case 'Enter': case 'ArrowDown':
                event.preventDefault()
                this.selection.selectNextInCol(this.root, 1)
                break
            case 'ArrowUp':
                event.preventDefault()
                this.selection.selectNextInCol(this.root, -1)
                break
            case 'ArrowLeft':
                event.preventDefault()
                this.selection.selectNextInRow(this.root, -1)
                break
        }
    }

    toHTML() {
        return createTable()
    }
}