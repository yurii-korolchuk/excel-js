export const createToolbar = (state) => {
    const textAlignButtons = [
        {
            className: 'toolbar__text-align-left',
            value: 'format_align_left',
            active: state.textAlign === 'left',
            id: {textAlign: 'left'}
        },
        {
            className: 'toolbar__text-align-center',
            value: 'format_align_center',
            active: false,
            id: {textAlign: 'center'}
        },
        {
            className: 'toolbar__text-align-right',
            value: 'format_align_right',
            active: false,
            id: {textAlign: 'right'}
        }
    ]

    const textDecorationButtons = [
        {
            className: 'toolbar__format-bold',
            value: 'format_bold',
            active: state.fontWeight === 'bold',
            id: {fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold'}
        },
        {
            className: 'toolbar__format-italic',
            value: 'format_italic',
            active: state.fontStyle === 'italic',
            id: {fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic'}
        },
        {
            className: 'toolbar__format-underline',
            value: 'format_underlined',
            active: state.textDecoration === 'underline',
            id: {
                textDecoration: state.textDecoration === 'underline'
                ? 'none' : 'underline'
            }
        }
    ]
    let groupsArray = []
    groupsArray = createNewGroup(
        'toolbar__text-align', textAlignButtons, groupsArray)

    groupsArray = createNewGroup(
        'toolbar__text-decoration', textDecorationButtons, groupsArray)

    return groupsArray.join('')
}

class ToolbarGroup {
    constructor(groupClass = '', buttons = []) {
        this.groupClass = groupClass
        this.buttons = buttons
    }

    buttonsTemplate() {
        const readyButtons = this.buttons.map(btn => {
            return `
                <button data-type="button" data-id='${JSON.stringify(btn.id)}' 
                        class="${btn.className} ${btn.active ? 'active' : ''}"
                        >
                    <span data-type="button" 
                          data-id='${JSON.stringify(btn.id)}' 
                          class="material-icons">${btn.value}
                    </span>
                </button>
            `
        })
        return readyButtons.join('')
    }

    toHTML() {
        return `
           <div class="${this.groupClass}">
                ${this.buttonsTemplate()}
            </div>
        `
    }
}

const createNewGroup = (groupClassName, buttonsArray, groupsArray) => {
    return [...groupsArray,
        new ToolbarGroup(groupClassName, buttonsArray).toHTML()]
}