import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { deleteCartItem } from '../utility/request';
import './home.css'

const Checkout = () => {
  const cart = useSelector(state => state.cartReducer.cart);

  const showCart = cart.map((item, index) =>
    <div key={index}>
      <CartItem item={item} />
    </div>
  );

  const submit = () => {
    cart.forEach((item) => {
      deleteCartItem(item.listingId)
      .then((res) => {
        console.log(res);
        console.log('Order has been placed.');
      });
    });
  };

  return (
    <div>
      <div>
        <h3>Review items</h3>
        {showCart}
        <form>
          <button class="button" type='submit' onClick={submit}>Place order</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;