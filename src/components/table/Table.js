import {ExcelComponent} from 'core/ExcelComponent'
import {$} from 'core/dom'
import {createTable} from '@/components/table/table.template'
import {TableSelection} from '@/components/table/TableSelection'
import {
    isCell,
    section,
    shouldResize, tableNavigation,
} from '@/components/table/table.functions'
import {resize} from '@/components/table/table.functions'
import * as actions from '@/redux/actions'
import {parse} from 'core/utils/utils'

export class Table extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options,
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
            const id = this.selection.current.id
            const inputData = {
                id,
                value,
            }
            this.selection.current.text(parse(value))
            this.$dispatch(actions.tableInput(inputData))
        })

        this.$observe('formula-unfocus', event => {
            event.target.blur()
            this.selection.current.focus()
        })

        this.$trigger('table-change', this.selection.current.text())
        this.$trigger('table-select', this.selection.current)

        this.$observe('toolbar-select', newStyle => {
            this.selection.group.forEach(cell => {
                cell.css(newStyle)
                const data = {
                    id: cell.id,
                    style: newStyle,
                }
                try {
                    this.$dispatch(actions.tableStyle(data))
                } catch (e) {
                    console.warn(e.message)
                }
            })
        })
    }

    async resizeHandler(event) {
        try {
            const data = await resize(this, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn(e.message)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeHandler(event)
        } else if (isCell(event, 'contenteditable')) {
            const target = $(event.target)
            if (event.ctrlKey) {
                this.selection.selectGroup(target)
            } else if (event.shiftKey) {
                section(this, target, this.selection)
            } else {
                this.selection.select(target)
                this.$trigger('table-change', target.text())
                this.$trigger('table-select', this.selection.current)
            }
        }
    }

    changeCell(n, method) {
        this.selection[method](this.root, n)
        this.$trigger('table-change', this.selection.current.text())
        this.$trigger('table-select', this.selection.current)
    }

    onKeydown(event) {
        tableNavigation(this, event)
    }

    onInput(event) {
        const target = $(event.target)
        const data = {
            id: target.id,
            value: target.text(),
        }
        this.$dispatch(actions.tableInput(data))
    }

    toHTML() {
        return createTable(this.store.getState())
    }
}