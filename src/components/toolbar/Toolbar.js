import {$} from "core/dom";
import {ExcelComponent} from "core/ExcelComponent";
import {createToolbar} from "@/components/toolbar/toolbar.template";

export class Toolbar extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Toolbar',
            listeners: ['click']
        })
    }
    static className = 'toolbar'

    onClick(event) {
        const target = $(event.target)
        if (target.data.type === 'button') {
            console.log('button')
        }
    }

    toHTML() {
        return createToolbar()
    }
}