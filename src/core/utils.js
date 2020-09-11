export const capitalize = (string) => {
    if (typeof string !== 'string') {
        return ''
    } else {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
}

export const storage = (key, data = null) => {
    if (!data && localStorage[key]) {
        return JSON.parse(localStorage[key])
    }
    localStorage[key] = JSON.stringify(data)
}

export const areEqual = (a, b) => {
    if (typeof a === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    } else {
        return a === b
    }
}

export const camelToKebab = value => {
    if (typeof value !== 'object') {
        return false
    } else {
        let style = ''
        Object.keys(value).forEach(key => {
            const type = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
            style += ` ${type}: ${value[key]};`
        })
        return style
    }
}

