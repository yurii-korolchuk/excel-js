import {Page} from "core/pages/Page";
import {$} from "core/dom";

export class DashboardPage extends Page {
    getRoot() {
        return $.create('div', 'dashboard').html(
            `
                <div class="dashboard__header">
                    Excel JS
                </div>
    
                <div class="dashboard__new">
                    <div>
                        <a href="#">Новая Таблица</a>
                    </div>
                </div>
    
            <ul class="dashboard__list">
                <div class="dashboard__list-date">
                    <div>Название</div>
                    <div>Дата открытия</div>
                </div>
                <li class="dashboard__list-item ">
                    <div class="name">
                        Таблица номер 1
                    </div>
                    <div class="date">
                        11.11.1111
                    </div>
                </li>
                <li class="dashboard__list-item ">
                    <div class="name">
                        Таблица номер 1
                    </div>
                    <div class="date">
                        11.11.1111
                    </div>
                </li>
                <li class="dashboard__list-item ">
                    <div class="name">
                        Таблица номер 1
                    </div>
                    <div class="date">
                        11.11.1111
                    </div>
                </li>
            </ul>
            `
        )
    }
}