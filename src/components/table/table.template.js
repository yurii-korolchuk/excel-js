import {camelToKebab, parse} from 'core/utils/utils'

const CODES = {
    A: 65,
    Z: 90,
}

const DEFAULT_WIDTH = '120px'
const DEFAULT_HEIGHT = '25px'

export const stringFromChar = (_, index) => {
    return String.fromCharCode(CODES.A + index)
}

const columnIndex = (el, state) => {
    return `<div class="col__data" data-type="resizable" data-index=${el}
                 style="width: ${state[el] || DEFAULT_WIDTH}"> 
                <div class="col__text">${el}</div>
                <div class="col__resize" data-resize="col"></div> 
            </div>
    `
}

const getColumnIndexes = (length, state) => {
    return new Array(length)
        .fill('')
        .map(stringFromChar)
        .map(el => columnIndex(el, state))
        .join('')
}

const getRow = (index, length = CODES.Z - CODES.A + 1, state) => {
    const template = (_, info, state) => {
        const id = `${stringFromChar(null, info)}${index}`
        const colId = stringFromChar(null, info)
        let style = `
            width: ${state.colState[colId] || DEFAULT_WIDTH};
            height: ${state.rowState[index] || DEFAULT_HEIGHT};`
        style += ` ${camelToKebab(state.cellStyle[id])}`

        return `<div class="cell" 
                     contenteditable 
                     spellcheck="false"
                     data-cell-index=${index}
                     data-cell-info=${colId}
                     data-id=${id}
                     style="${style}"
                     >${parse(state.cellState[id]) || ''}</div>`
    }
    const cells = new Array(length)
        .fill('')
        .map((el, i) => template(el, i, state))
        .join('')

    return `
        <div class="row">
            <div class="row__index" 
                 data-type="resizable" 
                 data-index=${index}
                 style="height: ${state.rowState[index] || DEFAULT_HEIGHT}">
                <div class="index">${index}</div> 
                <div class="row__resize" data-resize="row"></div>
            </div>
            ${cells}
        </div>
    `
}

const createRow = (length = 15, state) => {
    return new Array(length)
        .fill('')
        .map((el, i) => getRow(i + 1, CODES.Z - CODES.A + 1, state))
        .join('')
}

const createColumnIndexes = (columnIndexesLength, state) => {
    const columnIndexes = getColumnIndexes(columnIndexesLength, state.colState)
    const row = createRow(15, state)
    return `
        <div class="row">
            <div class="row__index"></div>
            ${columnIndexes}
        </div>
        ${row}
    `
}

export const createTable = (state) => {
    return createColumnIndexes(CODES.Z - CODES.A + 1, state)
}