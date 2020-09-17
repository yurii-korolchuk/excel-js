import {$, Dom} from './dom'

describe('Dom:', () => {
    let tmp
    beforeEach(() => {
        tmp = $.create('div', 'someClass')
    })

    test('should return new instance of Dom', () => {
        expect(tmp).toBeInstanceOf(Dom)
    })

    test('should change innerHTML', () => {
        expect(tmp.html('fadsfdas').html()).toBe('fadsfdas')
    })

    test('should change textContent', () => {
        expect(tmp.text('fadfasf').text()).toBe('fadfasf')
    })

    test('should clear innerHTML', () => {
        tmp.html('fadsfdasfdas')
        expect(tmp.clear().html()).toBe('')
    })

    test('should add class', () => {
        expect(tmp.addClass('class').classList).toContain('class')
    })
})