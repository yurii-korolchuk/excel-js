const CODES = {
    A: 65,
    Z: 90
}

const stringFromChar = (_, index) => {
    return String.fromCharCode(CODES.A + index)
}

const columnIndex = (el) => {
    return `<div class="col__data" data-type="resizable" data-index=${el}> 
                <div class="col__text">${el}</div>
                <div class="col__resize" data-resize="col"></div> 
            </div>       
    `
}

const getColumnIndexes = (length) => {
    return new Array(length)
        .fill('')
        .map(stringFromChar)
        .map(columnIndex)
        .join('')
}

const getRow = (index, length = CODES.Z - CODES.A + 1) => {
    const template = (_, info) => {
        const id = `${stringFromChar(null, info)}${index}`
        return `<div class="cell" 
                     contenteditable 
                     spellcheck="false"
                     data-cell-index=${index}
                     data-cell-info=${stringFromChar(null, info)}
                     data-id=${id}
                     ></div>`
    }
    const cells = new Array(length)
        .fill('')
        .map((el, i) => template(el, i))
        .join('')
    return `
        <div class="row">
            <div class="row__index" data-type="resizable" data-index=${index}>
                <div class="index">${index}</div> 
                <div class="row__resize" data-resize="row"></div>
            </div>
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