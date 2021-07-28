import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { getCart } from '../utility/request.js';
import './home.css'

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartReducer.cart);

  const showCart = cart.map((item, index) =>
    <div key={index}>
      <CartItem item={item} />
    </div>
  );

  React.useEffect(() => {
    getCart()
      .then((res => {
        console.log(res);
        dispatch(setCart(res.data));
      }))
  }, []);

  return (
    <div>
      <div>
        {showCart}
      </div>
      <div>
        <Link to="/Checkout">
          <button class="button" type="button">Proceed to checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;