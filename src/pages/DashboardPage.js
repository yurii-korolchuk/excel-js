import {Page} from '@/pages/Page'
import {$} from 'core/dom'
import {recordsOnPage} from '@/pages/dashboard.functions'

export class DashboardPage extends Page {
    getRoot() {
        const id = Date.now().toString()
        return $.create('div', 'dashboard').html(
            `
                <div class="dashboard__header">
                    Excel JS
                </div>
    
                <div class="dashboard__new">
                    <div>
                        <a href="#excel/${id}">Новая Таблица</a>
                    </div>
                </div>
                ${recordsOnPage()}
            `
        )
    }
}