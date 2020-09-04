import {ExcelComponent} from "core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "core/dom";
import {TableSelection} from "@/components/table/TableSelection";

export class Table extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Table',
            listeners: ['click', 'mousedown'],
            ...options
        })
    }
    static className = 'table'

    init() {
        super.init();
        const selection = new TableSelection()
        selection.select(this.root.find('[data-id="A1"]'))
    }

    onClick(event) {
        if (event.target.hasAttribute('contenteditable')) {
            const target = event.target
            this.root.findAll('[data-selected="true"]')
                .forEach(item => {
                    item.removeAttribute('data-selected')
                })
            target.setAttribute('data-selected', 'true')
        }
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            event.preventDefault()
            const target = $(event.target)
            const parent = target.closest('[data-type="resizable"]')
            const type = target.data.resize === 'col'
            const styleType = type ? 'width' : 'height'
            const initialSize = Math.round(+getComputedStyle(parent)[styleType]
                .replace(/[a-z]/ig, ''))

            document.onmousemove = e => {
                const clientCoord = type ? e.clientX : e.clientY
                const parentCoord = type
                    ? parent.getBoundingClientRect().right
                    : parent.getBoundingClientRect().bottom

                const delta = Math.floor(clientCoord - parentCoord)
                const position = type ? 'right' : 'bottom'
                target.style[position] = -delta + 'px'

                document.onmouseup = e => {
                    parent.style[styleType] = +delta + +initialSize + 'px'
                    const cellDataCheck = type
                        ? 'data-cell-info'
                        : 'data-cell-index'
                    const index = parent.dataset.index
                    console.log(index)
                    this.root.findAll(`[${cellDataCheck}="${index}"]`)
                        .forEach(item => {
                            item.style[styleType] = window
                                .getComputedStyle(parent)[styleType]
                        })
                    target.style[position] = ''
                    document.onmousemove = null
                    document.onmouseup = null
                }
            }
        }
    }

    toHTML() {
        return createTable()
    }
}