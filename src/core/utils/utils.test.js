import {
    capitalize,
    areEqual,
    camelToKebab,
    parse, debounce
} from './utils';

describe('capitalize:', () => {
    test('should return capitalized string', () => {
        const tmp = 'yurii'
        expect(capitalize(tmp)).toBe('Yurii')
    })

    test('should return blank string', () => {
        expect(capitalize({})).toBe('')
    })
})

describe('areEqual:', () => {
    test('same objects should return true', () => {
        const tmp1 = {
            count: 1,
            someArray: ['1', '2']
        }
        const tmp2 = {
            count: 1,
            someArray: ['1', '2']
        }
        expect(areEqual(tmp1, tmp2)).toBeTruthy()
    })

    test('different object should return false', () => {
        const tmp1 = {
            count: 1,
            someArray: ['1', '2']
        }
        const tmp2 = {
            count: 1,
            someArray: ['1', '1']
        }
        expect(areEqual(tmp1, tmp2)).toBeFalsy()
    })

    test('same primitives should return true', () => {
        expect(areEqual(1, 1)).toBeTruthy()
    })

    test('different primitives should return false', () => {
        expect(areEqual(1, 2)).toBeFalsy()
    })
})

describe('camelToKebab:', () => {
    test('should return false if not object is passed', () => {
        expect(camelToKebab('')).toBeFalsy()
    })

    test('should transform camel to kebab in object', () => {
        const tmp = {
            textAlign : 'center'
        }
        console.log(camelToKebab(tmp))
        expect(camelToKebab(tmp)).toBe(' text-align: center;')
    })
})

describe('parse:', () => {
    test('should return itself if value doesn\'t start with "="', () => {
        expect(parse('1+1')).toBe('1+1')
    })

    test('should parse string', () => {
        expect(parse('=1+1')).toBe(2)
    })
})

describe('debounce:', () => {
    let tmp_func
    let tmp
    let value

    beforeEach(() => {
        tmp_func = (value) => value = value + 1
        tmp = debounce(tmp_func, 300)
        value = 1
    })

    test('should change value after debounce timer', () => {
        tmp(value)
        setTimeout(() => {
            expect(value).toBe(2)
        }, 301)
    })

    test('should call debounce func only one time', () => {
        tmp(value)
        tmp(value)
        setTimeout(() => {
            expect(tmp_func).toBeCalledTimes(1)
        }, 301)
    })
})