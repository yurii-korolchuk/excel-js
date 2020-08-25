import {ExcelComponent} from "core/ExcelComponent";

export class Formula extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Formula',
            listeners: ['input']
        })
    }
    static className = 'formula'

    onInput() {}
}