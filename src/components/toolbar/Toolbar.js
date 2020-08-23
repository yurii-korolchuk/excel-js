import {ExcelComponent} from "core/ExcelComponent";

export class Toolbar extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Header',
            listeners: ['click']
        })
    }
    static className = 'toolbar'
}