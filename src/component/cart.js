import {createElement} from 'react';
import map from 'lodash/fp/map';
import reduce from 'lodash/fp/reduce';
import {connect} from 'react-redux';

import {clear, setQuantity, deleteItem} from '../action/cart';
import * as products from '../data/items';
import Heading from './heading';

const Item = connect(
  () => ({}),
  {setQuantity, deleteItem}
)(({id, quantity, setQuantity, deleteItem}) => {
  const {title, price} = products[id];
  const inc = () => setQuantity({id, quantity: quantity + 1});
  const dec = () => quantity - 1 < 1
    ? deleteItem({id})
    : setQuantity({id, quantity: quantity - 1});

  return (
    <tr>
      <td>
        {title}
      </td>
      <td>
        {price}
      </td>
      <td>
        {quantity}
        <a onClick={inc}>+</a> <a onClick={dec}>-</a>
      </td>
      <td>
        {price * quantity}
      </td>
    </tr>
  );
});

const Cart = ({total, items}) => (
  <div>
    <Heading>Cart</Heading>
    <a onClick={clear}>Clear all items</a>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {map((item) => <Item {...item}/>, items)}
        <tr><td colSpan={3}/><td>TOTAL: {total}</td></tr>
      </tbody>
    </table>
  </div>
);

export default connect((state) => {
  return {
    items: state.cart.items,
    total: reduce(
      (sum, {id, quantity}) => sum + products[id].price * quantity,
      0,
      state.cart.items
    ),
  };
})(Cart);
