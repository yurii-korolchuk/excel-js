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
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }
    static className = 'table'

    init() {
        super.init()
        this.selection = new TableSelection()
        const current = this.root.find('[data-id="A1"]')
        this.selection.select(current)

        this.$observe('formula-input', data => {
            const value = $(data).text()
            this.selection.current.text(value)
        })

        this.$observe('formula-unfocus', event => {
            event.target.blur()
            this.selection.current.focus()
        })

        this.$trigger('table-change', this.selection.current.text())
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

    changeCell(n, method) {
        this.selection[method](this.root, n)
        this.$trigger('table-change', this.selection.current.text())
    }

    onKeydown(event) {
        switch (event.code) {
            case 'Tab': case 'ArrowRight':
                event.preventDefault()
                this.changeCell(1, 'selectNextInRow')
                break
            case 'Enter': case 'ArrowDown':
                event.preventDefault()
                this.changeCell(1, 'selectNextInCol')
                break
            case 'ArrowUp':
                event.preventDefault()
                this.changeCell(-1, 'selectNextInCol')
                break
            case 'ArrowLeft':
                event.preventDefault()
                this.changeCell(-1, 'selectNextInRow')
                break
        }
    }

    onInput(event) {
        this.$trigger('table-input', $(event.target).text())
    }

    toHTML() {
        return createTable()
    }
}