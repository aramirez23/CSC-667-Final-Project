const INITIAL_STATE = {
  cart: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SET_CART':
      return {
        ...state,
        cart: action.cart
      };
    default:
      return state;
  }
};

export default cartReducer;