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
const router = new Router('#app')
// const initial = storage('excel-state') || {
//     colState: {},
//     rowState: {},
//     cellState: {},
//     cellStyle: {},
//     currText: '',
//     headerName: ''
// }
// const store = createStore(reducer, initial)
//
// const stateListener = debounce(state => {
//     storage('excel-state', state)
// }, 300)
//
// store.subscribe(stateListener)
//
// const excel = new Excel('#app',
//     {
//         components: [Header, Toolbar, Formula, Table]
//     },
//     store
// )
//
// excel.render()
