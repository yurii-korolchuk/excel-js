class Dom {
    constructor(selector) {
        this.el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(newHTML) {
        if (typeof newHTML === 'string') {
            this.el.innerHTML = newHTML
            return this
        } else {
            return this.el.innerHTML
        }
    }

    get style() {
        return this.el.style
    }

    get data() {
        return this.el.dataset
    }

    clear() {
        this.el.innerHTML = ''
        return this
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.el
        }

        if (Element.prototype.append) {
            this.el.append(node)
        } else {
            this.el.appendChild(node)
        }
    }

    on(eventType, callback) {
        this.el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.el.removeEventListener(eventType, callback)
    }

    closest(selector) {
        return this.el.closest(selector)
    }

    find(selector) {
        if (this.el.querySelector(selector)) {
            return $(this.el.querySelector(selector))
        } else {
            return null
        }
    }

    findAll(selector) {
        return this.el.querySelectorAll(selector)
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            if (this.style[key]) {
                this.style[key] = styles[key]
            }
        })
    }

    addClass(classSelector) {
        this.el.classList.add(classSelector)
        return this
    }

    removeClass(classSelector) {
        this.el.classList.remove(classSelector)
        return this
    }

    addAttr(attr, value = true) {
        this.el.setAttribute(attr, value)
        return this
    }

    removeAttr(attr) {
        this.el.removeAttribute(attr)
        return this
    }

    id() {
        return this.el.data.id
    }

    get nextSibling() {
        if (this.el.nextElementSibling) {
            return $(this.el.nextElementSibling)
        } else {
            return null
        }
    }

    get parent() {
        if (this.el.parentElement) {
            return $(this.el.parentElement)
        } else {
            return null
        }
    }

    focus() {
        this.el.focus()
        return this
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes.length) {
        el.classList.add(classes)
    }
    return $(el)
}
