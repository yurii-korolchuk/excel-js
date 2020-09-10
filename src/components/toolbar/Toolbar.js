import {$} from "core/dom";
import {createToolbar} from "@/components/toolbar/toolbar.template";
import {ExcelStateComponent} from "core/ExcelStateComponent";

export class Toolbar extends ExcelStateComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Toolbar',
            listeners: ['click']
        })
    }
    static className = 'toolbar'

    get template() {
        return createToolbar(this.state)
    }

    prepare() {
        this.initState({
            textAlign: 'left',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none'
        })
    }

    onClick(event) {
        const target = $(event.target)
        if (target.data.type === 'button') {
            this.setState(JSON.parse(target.id))
        }
    }

    toHTML() {
        return this.template
    }
}