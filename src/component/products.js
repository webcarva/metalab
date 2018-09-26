import {createElement} from 'react';
import Product from './product';
import * as products from '../data/items';
import Heading from './heading';
import classNames from 'classnames';
import styles from './styles.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';

export default () => (
  <div>
    <Heading><FontAwesomeIcon icon={faCoffee} /> Products</Heading>
    <div className={classNames(styles.products)}>
      <Product {...products.cake}/>
      <Product {...products.waffle}/>
      <Product {...products.chocolate}/>
    </div>
  </div>
);
