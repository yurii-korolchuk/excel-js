import {$} from "core/dom"
import {createToolbar} from "@/components/toolbar/toolbar.template"
import {ExcelStateComponent} from "core/ExcelStateComponent"

export class Toolbar extends ExcelStateComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Toolbar',
            listeners: ['click'],
            ...options
        })
    }
    static className = 'toolbar'

    get template() {
        return createToolbar(this.state)
    }

    prepare() {
        this.defaultState = {
            textAlign: 'left',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none'
    }
        this.initState({...this.defaultState})
    }

    init() {
        super.init()
        this.$observe('table-select', cell => {
            const state = cell.getStyles([...Object.keys(this.defaultState)])

            Object.keys(state).forEach(key => {
                if (state[key] === '') {
                    state[key] = this.defaultState[key]
                }
            })

            this.setState(state)
        })
    }

    onClick(event) {
        const target = $(event.target)
        if (target.data.type === 'button') {
            this.setState(JSON.parse(target.id))
            this.$trigger('toolbar-select', JSON.parse(target.id))
        }
    }

    toHTML() {
        return this.template
    }
}