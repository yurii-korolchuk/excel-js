import {ExcelComponent} from "core/ExcelComponent";

export class Formula extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribers: ['currText'],
            ...options
        })
    }
    static className = 'formula'

    init() {
        super.init();
        this.input = this.root.find('#input')
        this.$observe('table-change', data => this.changeInputValue(data))
    }

    changeInputValue(text) {
        this.input.text(text)
    }

    onInput(event) {
        this.$trigger('formula-input', event.target)
    }

    storeChanged(changes) {
        this.changeInputValue(changes.currText)
    }

    onKeydown(event) {
        if (event.code === 'Enter') {
            event.preventDefault()
            this.$trigger('formula-unfocus', event)
        }
    }

    toHTML() {
        return `
            <div class="formula__fx">fx</div>
            <div id="input"
                 class="formula__input"
                 contenteditable 
                 spellcheck="false">
            </div>
        `
    }
}