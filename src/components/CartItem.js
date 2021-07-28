import React from 'react';
import { deleteCartItem } from '../utility/request';
import './cartitem.css'

const CartItem = ({item}) => {
  const deleteItem = () => {
      console.log('Deleting item from cart');
      deleteCartItem(item.listingId)
        .then((res) => {
          console.log(res);
          console.log('Deleted.');
        });
  };

  return (
    <div>
      <div>
        <p>{item.title}</p>
        <p>{item.price}</p>
      </div>
      <form>
        <button class="button" type='submit' onClick={deleteItem}>Delete</button>
      </form>
    </div>
  );
};

export default CartItem;