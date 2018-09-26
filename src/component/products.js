import {createElement} from 'react';
import Product from './product';
import * as products from '../data/items';
import Heading from './heading';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';

export default () => (
  <div>
    <Heading><FontAwesomeIcon icon={faCoffee} /> Products</Heading>
    <Product {...products.cake}/>
    <Product {...products.waffle}/>
    <Product {...products.chocolate}/>
  </div>
);
