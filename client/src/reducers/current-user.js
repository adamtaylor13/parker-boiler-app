export default function currentUser (state = null, action) {
    switch (action.type) {
        case 'USER_LOGGED_IN':
        case 'ACCOUNT_CREATED':
        case 'PASSWORD_RESET_SENT':
            return action.data;
        case 'USER_LOGGED_OUT':
            return null;
        default:
            return state;
    }
}