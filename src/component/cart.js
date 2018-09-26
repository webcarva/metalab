import {createElement} from 'react';
import map from 'lodash/fp/map';
import reduce from 'lodash/fp/reduce';
import {connect} from 'react-redux';

import {clear, setQuantity, deleteItem} from '../action/cart';
import * as products from '../data/items';
import Heading from './heading';
import styles from './styles.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faPlus,
  faMinus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

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
    <tr key={id}>
      <td>
        {title} <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteItem({id})} />
      </td>
      <td>
        ${price}
      </td>
      <td>
        <FontAwesomeIcon icon={faMinus} onClick={dec} /> {quantity} <FontAwesomeIcon icon={faPlus} onClick={inc} />
      </td>
      <td>
        ${Math.round((price * quantity) * 100) / 100}
      </td>
    </tr>
  );
});

const Cart = connect(() => ({}), {clear})(({total, items, clear}) => {
  return (
    <div>
      <Heading><FontAwesomeIcon icon={faShoppingCart} /> Cart</Heading>
      {items.length ? (
        <div>
          <button onClick={clear}>Clear all items</button>
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
              <tr>
                <td colSpan={3}/>
                  <h2>${Math.round((total) * 100) / 100}</h2>
                </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
});

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
