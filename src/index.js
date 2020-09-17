import {Router} from 'core/routing/Router';
import './sass/index.sass'
import {DashboardPage} from 'core/pages/DashboardPage';
import {ExcelPage} from 'core/pages/ExcelPage';

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage,
})

