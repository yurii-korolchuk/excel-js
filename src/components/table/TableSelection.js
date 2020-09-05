import {$} from "core/dom";
import {numberFromChar} from "@/components/table/table.functions";

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

    selectNextInRow() {
        this.clear()
        this.current = this.current.nextSibling
            ? this.current.nextSibling
            : this.jumpToNextRow()
        this.select(this.current)
    }

    jumpToNextRow() {
        if (this.current.parent.nextSibling) {
            return this.current.parent.nextSibling.find('[data-cell-index]')
        } else {
            return this.reset()
        }
    }

    selectNextInCol(root) {
        const currIndex = this.current.data.cellIndex
        const currInfo = this.current.data.cellInfo
        const selector = `[data-cell-index="${+currIndex + 1}"][data-cell-info="${currInfo}"`

        this.current = root.find(selector)
            ? root.find(selector)
            : this.jumpToNextCol(root)
        this.select(this.current)
    }

    jumpToNextCol(root) {
        const index = numberFromChar(this.current.data.cellInfo)
        const newIndex = String.fromCharCode(index + 1)
        if (root.find(`[data-cell-info="${newIndex}"]`)) {
            return this.current = root.find(`[data-cell-info="${newIndex}"]`)
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