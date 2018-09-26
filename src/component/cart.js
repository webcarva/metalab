import {createElement} from 'react';
import map from 'lodash/fp/map';
import reduce from 'lodash/fp/reduce';
import {connect} from 'react-redux';
import classNames from 'classnames';

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
)(({id, quantity, setQuantity, deleteItem, mobile}) => {
  const {title, price} = products[id];
  const inc = () => setQuantity({id, quantity: quantity + 1});
  const dec = () => quantity - 1 < 1
    ? deleteItem({id})
    : setQuantity({id, quantity: quantity - 1});

  return mobile ? (
    <div className={classNames(styles.mobileRow)}>
      <div>
        <span>Product:</span>
        <span>{title}
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => deleteItem({id})}
            className={classNames(
              styles.margin,
              styles.clickableIcon,
              styles.iconNegative
            )}
          />
        </span>
      </div>
      <div>
        <span>Price:</span> <span>${price}</span>
      </div>
      <div>
        <span>Quanity:</span>
        <span>
          <FontAwesomeIcon
            icon={faMinus}
            onClick={dec}
            className={classNames(
              styles.margin,
              styles.clickableIcon,
              styles.iconNegative
            )}
          />
          {quantity}
          <FontAwesomeIcon
            icon={faPlus}
            onClick={inc}
            className={classNames(
              styles.margin,
              styles.clickableIcon,
              styles.iconPositive
            )}
          />
        </span>
      </div>
      <div>
        <span>Line Total:</span>
        <span>${Math.round((price * quantity) * 100) / 100}</span>
      </div>
    </div>
  ) : (
    <tr key={id}>
      <td>
        {title}
        <FontAwesomeIcon
          icon={faTrashAlt}
          onClick={() => deleteItem({id})}
          className={classNames(
            styles.margin,
            styles.clickableIcon,
            styles.iconNegative
          )}
        />
      </td>
      <td>
        ${price}
      </td>
      <td>
        <FontAwesomeIcon
          icon={faMinus}
          onClick={dec}
          className={classNames(
            styles.margin,
            styles.clickableIcon,
            styles.iconNegative
          )}
        />
        {quantity}
        <FontAwesomeIcon
          icon={faPlus}
          onClick={inc}
          className={classNames(
            styles.margin,
            styles.clickableIcon,
            styles.iconPositive
          )}
        />
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
      <div className={classNames(styles.section)}>
        {items.length ? (
          <div>
            <button onClick={clear}>Clear all items</button>
            <div className={classNames(styles.mobile)}>
              {map((item) => <Item {...item} mobile />, items)}
              <div>
                <p className={classNames(styles.total)}>
                  TOTAL:&nbsp;${Math.round((total) * 100) / 100}
                </p>
              </div>
            </div>
            <div className={classNames(styles.desktop)}>
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
                    <td colSpan={4}>
                      <p className={classNames(styles.total)}>
                        TOTAL:&nbsp;${Math.round((total) * 100) / 100}
                      </p>
                    </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
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
