import {ExcelComponent} from "core/ExcelComponent";

export class Formula extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Formula',
            listeners: ['input'],
            ...options
        })
    }
    static className = 'formula'

    onInput() {}

    toHTML() {
        return `
            <div class="formula__fx">fx</div>
            <div class="formula__input" 
                 contenteditable 
                 spellcheck="false">     
            </div>
        `
    }
}