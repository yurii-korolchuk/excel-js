const CODES = {
    A: 65,
    Z: 90
}

const stringFromChar = (index) => {
    return String.fromCharCode(CODES.A + index)
}

const columnIndex = (el) => {
    return `<div class="row__data">${el}</div>`
}

const getColumnIndexes = (length) => {
    const arr = []
    for (let i = 0; i < length; i++) {
        arr.push(columnIndex(stringFromChar(i)))
    }
    return arr.join('')
}

const getRow = (index, length = CODES.Z - CODES.A + 1) => {
    let cells = ''
    for (let i = 0; i < length; i++) {
        cells+= `<div class="row__column" contenteditable spellcheck="false"></div>`
    }
    return `
        <div class="row">
            <div class="row__index">${index}</div>
            ${cells}
        </div>
    `
}

const createRow = (length = 15) => {
    let rowIndexes = ''
    for (let i = 1; i < length + 1; i++) {
        rowIndexes += getRow(i)
    }
    return rowIndexes
}

const createColumnIndexes = (columnIndexesLength) => {
    const columnIndexes = getColumnIndexes(columnIndexesLength)
    const row = createRow()
    return `
        <div class="row">
            <div class="row__index"></div>
            ${columnIndexes}
        </div>
        ${row}
    `
}

export const createTable = () => {
    return createColumnIndexes(CODES.Z - CODES.A + 1)
}