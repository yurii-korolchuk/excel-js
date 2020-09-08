import {Excel} from "@/components/excel/Excel";
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";
import {createStore} from "core/createStore";
import {reducer} from "@/redux/reducer";
import {storage} from "core/utils";
import './sass/index.sass'
const initial = storage('excel-state') || {
    colState: {},
    rowState: {}
}
const store = createStore(reducer, initial)

store.subscribe(state => {
    storage('excel-state', state)
})

const excel = new Excel('#app',
    {
        components: [Header, Toolbar, Formula, Table]
    },
    store
)

excel.render()
