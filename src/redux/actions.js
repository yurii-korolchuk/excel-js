import {TABLE_INPUT, TABLE_RESIZE} from "@/redux/types";

export const tableResize = (data) => {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export const tableInput = (data) => {
    return {
        type: TABLE_INPUT,
        data
    }
}