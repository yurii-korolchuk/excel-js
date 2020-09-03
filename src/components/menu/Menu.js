import {ExcelComponent} from "core/ExcelComponent";

export class Menu extends ExcelComponent {
    constructor(root, options = {}) {
        super(root, {
            name: 'Menu',
            ...options
        });
    }

}