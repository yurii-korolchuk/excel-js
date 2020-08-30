import {ExcelComponent} from "core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "core/dom";

export class Table extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Table',
            listeners: ['click', 'mousedown']
        })
    }
    static className = 'table'

    onClick(event) {
        if (event.target.hasAttribute('contenteditable')) {
            const target = event.target
            document.querySelectorAll('[data-selected="true"]')
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
            const type = event.target.dataset.resize === 'col'
            const styleType = type ? 'width' : 'height'
            const initialSize = Math.round(+getComputedStyle(parent)[styleType]
                .replace(/[a-z]/ig, ''))
            console.log(initialSize)

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