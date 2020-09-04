export class TableSelection {
    constructor() {
        this.group = []
    }

    select(el) {
        this.clear()
        this.group.push(el)
        el.data.selected = 'true'
    }

    selectGroup() {}

    clear() {
        this.group.forEach(item => {
            item.removeAttr('data-selected')
        })
        this.group = []
    }
}