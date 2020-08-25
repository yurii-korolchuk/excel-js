const CODES = {
    A: 65,
    Z: 90
}

const stringFromChar = (_, index) => {
    return String.fromCharCode(CODES.A + index)
}

const columnIndex = (el) => {
    return `<div class="row__data">${el}</div>`
}

const getColumnIndexes = (length) => {
    return new Array(length)
        .fill('')
        .map(stringFromChar)
        .map(columnIndex)
        .join('')
}

const getRow = (index, length = CODES.Z - CODES.A + 1) => {
    const template = `<div class="row__column" 
                           contenteditable 
                           spellcheck="false">
                      </div>`
    const cells = new Array(length)
        .fill('')
        .map(el => template)
        .join('')
    return `
        <div class="row">
            <div class="row__index">${index}</div>
            ${cells}
        </div>
    `
}

const createRow = (length = 15) => {
    return new Array(length)
        .fill('')
        .map((el, i) => getRow(i + 1))
        .join('')
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