import {$} from 'core/dom/dom'

export const resize = (el, event) => {
    event.preventDefault()
    return new Promise(resolve => {
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

                resolve({
                    id: index,
                    value: +delta + +initialSize + 'px',
                    isColResize: type,
                })

                document.onmousemove = null
                document.onmouseup = null
            }
        }
    })
}

export const tableNavigation = (table, event) => {
    switch (event.code) {
        case 'Tab': case 'ArrowRight':
            event.preventDefault()
            table.changeCell(1, 'selectNextInRow')
            break
        case 'Enter': case 'ArrowDown':
            event.preventDefault()
            table.changeCell(1, 'selectNextInCol')
            break
        case 'ArrowUp':
            event.preventDefault()
            table.changeCell(-1, 'selectNextInCol')
            break
        case 'ArrowLeft':
            event.preventDefault()
            table.changeCell(-1, 'selectNextInRow')
            break
    }
}

export const section = (el, target, selection) => {
    const current = selection.current

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

    const idsmap = ids.map(ids => {
        return el.root.find(`[data-id="${ids}"]`)
    })

    selection.createSelection(idsmap)
}

export const shouldResize = (event) => {
    return event.target.dataset.resize
}

export const isCell = (event, attributeToCheck) => {
    return event.target.hasAttribute(attributeToCheck)
}

export const range = (start, end) => {
    if (start > end) [start, end] = [end, start]

    return new Array(end - start + 1)
        .fill('')
        .map((el, index) => {
            return `${+start + index}`
        })
}

export const numberFromChar = (char) => {
    return char.charCodeAt(0)
}