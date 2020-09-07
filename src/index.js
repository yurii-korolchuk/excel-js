import {Excel} from "@/components/excel/Excel";
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";
import {createStore} from "core/createStore";
import {reducer} from "@/redux/reducer";
import './sass/index.sass'
import {storage} from "core/utils";

const store = createStore(reducer, storage('excel-state'))

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
