import {createElement} from 'react';
import {add, setQuantity} from '../action/cart';
import {connect} from 'react-redux';
import styles from './styles.css';

const Product = ({add, setQuantity, id, title, image, items}) => {
  const cartProduct = items.find((o) => o.id === id);
  const quantity = cartProduct ? cartProduct.quantity + 1 : null;
  let func = () => add(id);
  if (quantity > 1) func = () => setQuantity({id, quantity});
  return (
    <div className={styles.product} onClick={func}>
      <img src={image} alt={title} className={styles.productImage}/>
      {title}
    </div>
  );
};

export default connect(
  (state) => ({items: state.cart.items}), {add, setQuantity}
)(Product);
