export class TableSelection {
    static dataSelector = 'data-selected'
    constructor() {
        this.group = []
    }

    select(el) {
        this.clear()
        this.group.push(el)
        el.addAttr(TableSelection.dataSelector)
    }

    selectGroup(el) {
        this.group.push(el)
        el.addAttr(TableSelection.dataSelector)
    }

    clear() {
        this.group.forEach(item => {
            item.removeAttr(TableSelection.dataSelector)
        })
        this.group = []
    }
}