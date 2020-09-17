import {$} from 'core/dom'
import {numberFromChar} from '@/components/table/table.functions'

export class TableSelection {
    static dataSelector = 'data-selected'
    static resetElemId = 'A1'

    constructor() {
        this.group = []
        this.current = undefined
    }

    select(el) {
        this.clear()
        this.group.push(el)
        this.current = el
        this.current.focus()
        el.addAttr(TableSelection.dataSelector)
    }

    selectGroup(el) {
        this.group.push(el)
        this.current = el
        el.addAttr(TableSelection.dataSelector)
    }

    createSelection(arr = []) {
        this.clear()
        this.group.push(...arr)
        arr.forEach(item => {
            item.data.selected = 'true'
        })
    }

    selectNextInRow(root, n) {
        const currIndex = this.current.data.cellIndex
        const currInfo = numberFromChar(this.current.data.cellInfo)
        const index = `[data-cell-index="${+currIndex}"]`
        const info = `[data-cell-info="${String.fromCharCode(currInfo + n)}"`
        const selector = index + info

        this.current = root.find(selector)
            ? root.find(selector)
            : this.current
        this.select(this.current)
    }

    selectNextInCol(root, n) {
        const currIndex = this.current.data.cellIndex
        const currInfo = this.current.data.cellInfo
        const index = `[data-cell-index="${+currIndex + n}"]`
        const info = `[data-cell-info="${currInfo}"`
        const selector = index + info

        this.current = root.find(selector)
            ? root.find(selector)
            : this.current
        this.select(this.current)
    }

    reset() {
        this.clear()
        return $(`[data-id=${TableSelection.resetElemId}]`)
    }

    get ids() {
        if (this.group.length) {
            return this.group.map(el => el.id)
        } else {
            return false
        }
    }

    clear() {
        this.group.forEach(item => {
            item.removeAttr(TableSelection.dataSelector)
        })
        this.group = []
    }
}