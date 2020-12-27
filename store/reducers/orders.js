import Order from "../../model/order";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.payload.items,
        action.payload.amount,
        new Date()
      );
      return { ...state, orders: state.orders.concat(newOrder) };
      break;
  }
  return state;
};
