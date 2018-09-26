import {handleActions} from 'redux-actions';
import {CLEAR_ITEMS, ADD_ITEM, SET_QUANTITY, DELETE_ITEM} from 'action/types';
import map from 'lodash/fp/map';

export default handleActions({
  [CLEAR_ITEMS]: () => ({
    items: [],
  }),
  [ADD_ITEM]: (state, {payload: id}) => ({
    ...state,
    items: [
      ...state.items,
      {id, quantity: 1},
    ],
  }),
  [DELETE_ITEM]: (state, {payload: {id: target}}) => ({
    ...state,
    items: state.items.filter(({id}) => (
      !target === id
    )),
  }),
  [SET_QUANTITY]: (state, {payload: {id: target, quantity}}) => ({
    ...state,
    items: map(({id, ...rest}) => (
      target === id ? {id, ...rest, quantity} : {id, ...rest}
    ), state.items),
  }),
}, {
  items: [],
});
