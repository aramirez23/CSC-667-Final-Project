const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_USER':
            console.log('here');
            console.log(action);
            return {
                firstName: action.action.firstName,
                lastName: action.action.lastName,
                email: action.action.email,
            };
        case 'LOGOUT_USER':
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default userReducer;
