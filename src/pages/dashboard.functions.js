import {storage} from 'core/utils/utils'

const getExcels = () => {
    const tables = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.includes('excel')) {
            tables.push(storage(key))
        }
    }
    return tables
}

const recordsTemplate = (name, date, id) => {
    const recordName = name || 'Новая таблица'
    const visitDate = new Date(date).toLocaleDateString() +
        ' | ' + new Date(date).toLocaleTimeString()

    return `
        <li class="dashboard__list-item">
            <a class="name" href="#excel/${id}">${recordName}</a>
            <div class="date">
                ${visitDate}
            </div>
        </li>
        `
}

const recordsToHtml = () => {
    const records = getExcels()
    if (!records.length) {
        return '<p>Таблицы не найдены</p>'
    }

    return records.map(el => {
        return recordsTemplate(el.headerName, el.time, el.id)
    }).join('')
}

export const recordsOnPage = () => {
    return `
        <ul class="dashboard__list">
            <div class="dashboard__list-date">
                <div>Название</div>
                <div>Дата открытия</div>
            </div>
            ${recordsToHtml()}
        </ul>
        `
}
