import {$} from "core/dom";

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

    selectNextByRow() {
        this.clear()
        this.current = this.current.nextSibling.el
            ? this.current.nextSibling
            : this.jumpToNextRow()
        this.group.push(this.current)
        this.current.focus()
        this.current.data.selected = 'true'
    }

    jumpToNextRow() {
        if (this.current.parent.nextSibling.el) {
            return this.current.parent.nextSibling.find('[data-cell-index]')
        } else {
            return this.reset()
        }
    }

    reset() {
        this.clear()
        return $(`[data-id=${TableSelection.resetElemId}]`)
    }

    clear() {
        this.group.forEach(item => {
            item.removeAttr(TableSelection.dataSelector)
        })
        this.group = []
    }
}