import {
    CHANGE_TIME,
    HEADER_INPUT,
    TABLE_INPUT,
    TABLE_RESIZE,
    TABLE_STYLE
} from "@/redux/types";

export const tableResize = data => {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export const tableInput = data => {
    return {
        type: TABLE_INPUT,
        data
    }
}

export const tableStyle = data => {
    return {
        type: TABLE_STYLE,
        data
    }
}

export const headerInput = data => {
    return {
        type: HEADER_INPUT,
        data
    }
}

export const changeTime = () => {
    return {
        type: CHANGE_TIME
    }
}