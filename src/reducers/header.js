export function header(state = '', action) {
    if (action.type === 'MSG') {
        return action.msg;
    }

    return state;
}