import {Observer} from './Observer'

class TemporaryFirst {
    constructor(observer) {
        this.observer = observer
    }

    call() {
        this.observer.trigger('test')
    }

    callNotExistingEvent() {
        this.observer.trigger('not_existing_event')
    }
}

class TemporarySecond {
    constructor(observer) {
        this.value = 0
        this.observer = observer
        this.unsub = this.observer.subscribe('test', () => {
            ++this.value
        })
    }
}


describe('Observer:', () => {
    let temporaryFirst
    let temporarySecond
    beforeEach(() => {
        const observer = new Observer()
        temporaryFirst = new TemporaryFirst(observer)
        temporarySecond = new TemporarySecond(observer)
    })

    test('should change value in class two', () => {
        temporaryFirst.call()
        expect(temporarySecond.value).toBe(1)
    })

    test('shouldn\'t change value if not existing event called', () => {
        temporaryFirst.callNotExistingEvent()
        expect(temporarySecond.value).toBe(0)
    })

    test('shouldn\'t change value if unsubscribed', () => {
        temporarySecond.unsub()
        temporaryFirst.call()
        expect(temporarySecond.value).toBe(0)

    })
})