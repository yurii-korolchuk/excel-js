import {ExcelComponent} from "core/ExcelComponent";

export class Excel extends ExcelComponent {
    constructor(containerSelector, {components = []} = {}) {
        super();
        this.container = document.querySelector(containerSelector)
        this.components = components;
    }
}