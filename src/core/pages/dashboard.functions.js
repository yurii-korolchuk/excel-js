import {storage} from "core/utils";

const getExcels = () => {
    const tables = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.includes('excel')) {
            tables.push(storage(key))
        } else {
            continue
        }
    }
    return tables
}

const formatDate = (date) => {
    return +date < 10 ? `0${date}` : date
}

const recordsTemplate = (name, date) => {
    const recordName = name || 'Новая таблица'
    const visitDate = new Date(+date)
    const day = formatDate(visitDate.getDate())
    const month = formatDate(visitDate.getMonth() + 1)
    const year = visitDate.getFullYear()
    const recordDate = `${day}.${month}.${year}`
    return `
        <li class="dashboard__list-item ">
            <div class="name">
                ${name}
            </div>
            <div class="date">
                ${recordDate}
            </div>
        </li>
        `
}

const recordsToHtml = () => {
    const records = getExcels()
    if (!records.length) {
        return '<p>Таблицы не найдены</p>'
    }
    console.log(records)
    return records.map(el => {
        return recordsTemplate(el.headerName, el.id)
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
