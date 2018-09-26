import {createElement} from 'react';
import Cart from './cart';
import Products from './products';
import styles from './styles.css';

export default () => (
  <div className={styles.container}>
    <Cart/>
    <Products/>
  </div>
);
