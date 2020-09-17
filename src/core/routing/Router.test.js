import {Router} from './Router';
import {Page} from '../../pages/Page';

class ExcelPage extends Page {}
class DashboardPage extends Page {
    getRoot() {
        const div = document.createElement('div')
        div.innerHTML = 'dashboard'
        return div
    }
}

describe('Router:', () => {
    let router
    beforeEach(() => {
        const div = document.createElement('div')
        router = new Router(div, {
            excel: ExcelPage,
            dashboard: DashboardPage
        })
    })

    test('should render dashboard first', () => {
        expect(router.placeholder.html())
            .toBe('<div>dashboard</div>')
    })

    test('should render dashboard by default', () => {
        router.handleHashChange()
        expect(router.placeholder.html())
            .toBe('<div>dashboard</div>')
    })

    test('should throw error if excel getRoot isn\'t implemented', () => {
        const PageClass = router.routes.excel
        const page = new PageClass()
        expect(() => page.getRoot()).toThrowError()
    })
})