export class TableSelection {
    static dataSelector = 'data-selected'
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

    clear() {
        this.group.forEach(item => {
            item.removeAttr(TableSelection.dataSelector)
        })
        this.group = []
    }
}