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