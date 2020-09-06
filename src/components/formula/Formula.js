import $ from '@/core/dom'
import {ExcelComponent} from "core/ExcelComponent";

export class Formula extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }
    static className = 'formula'

    onInput(event) {
        this.$trigger('formula-input', event.target)
    }

    onKeydown(event) {
        if (event.code === 'Enter') {
            this.$trigger('formula-unfocus', event)
        }
    }

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