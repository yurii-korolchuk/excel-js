import {Page} from '@/pages/Page'
import {debounce, storage} from 'core/utils/utils'
import {createStore} from 'core/store/createStore'
import {reducer} from '@/redux/reducer'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'

export class ExcelPage extends Page {
    getRoot() {
        const id = this.params
        const initial = storage(`excel-state-${id}`) || {
            colState: {},
            rowState: {},
            cellState: {},
            cellStyle: {},
            currText: '',
            headerName: 'Новая таблица',
            id: this.params,
            time: new Date().toJSON(),
        }

        const store = createStore(reducer, initial)
        storage(`excel-state-${id}`, initial)

        const stateListener = debounce(state => {
            storage(`excel-state-${id}`, state)
        }, 300)

        store.subscribe(stateListener)

        this.excel = new Excel(
            {
                components: [Header, Toolbar, Formula, Table],
            },
            store,
        )

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.render()
    }

    destroy() {
        this.excel.destroy()
    }
}