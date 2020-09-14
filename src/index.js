// import {Excel} from "@/components/excel/Excel";
// import {Header} from "@/components/header/Header";
// import {Toolbar} from "@/components/toolbar/Toolbar";
// import {Formula} from "@/components/formula/Formula";
// import {Table} from "@/components/table/Table";
// import {createStore} from "core/createStore";
// import {reducer} from "@/redux/reducer";
// import {debounce, storage} from "core/utils";
import {Router} from "core/routing/Router";
import './sass/index.sass'
import {DashboardPage} from "core/pages/DashboardPage";
import {ExcelPage} from "core/pages/ExcelPage";
const router = new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})

