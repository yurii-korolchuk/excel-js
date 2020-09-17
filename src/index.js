import {Router} from 'core/routing/Router';
import './sass/index.sass'
import {DashboardPage} from '@/pages/DashboardPage';
import {ExcelPage} from '@/pages/ExcelPage';

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage,
})

