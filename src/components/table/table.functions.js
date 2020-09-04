import {$} from "core/dom";

export const resize = (el, event) => {
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
            el.root.findAll(`[${cellDataCheck}="${index}"]`)
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

export const shouldResize = (event) => {
    return event.target.dataset.resize
}

export const isCell = (event) => {
    return event.target.hasAttribute('contenteditable')
}