import {createElement} from 'react';
import Cart from './cart';
import Products from './products';
import styles from './styles.css';
import classNames from 'classnames';

export default () => (
  <div className={classNames(styles.container)}>
    <div className={classNames(styles.section)}><Cart/></div>
    <div className={classNames(styles.section)}><Products/></div>
  </div>
);
