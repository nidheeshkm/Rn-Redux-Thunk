import CartItem from "../../model/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0.0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const added_product = action.payload;
      const product_price = added_product.price;
      const product_title = added_product.title;

      if (state.items[added_product.id]) {
        const updatedCartItem = new CartItem(
          state.items[added_product.id].quantity + 1,
          product_price,
          product_title,
          state.items[added_product.id].sum + product_price
        );
        return {
          ...state,
          items: { ...state.items, [added_product.id]: updatedCartItem },
          totalAmount: state.totalAmount + product_price,
        };
      } else {
        const cartitem = new CartItem(
          1,
          product_price,
          product_title,
          product_price
        );
        return {
          ...state,
          items: { ...state.items, [added_product.id]: cartitem },
          totalAmount: state.totalAmount + product_price,
        };
      }

    case REMOVE_FROM_CART:
      const selectedProduct = state.items[action.payload];
      const currQuantity = selectedProduct.quantity;
      let updatedCartItems;
      if (currQuantity > 1) {
        const updatedCart = new CartItem(
          selectedProduct.quantity - 1,
          selectedProduct.productPrice,
          selectedProduct.productTitle,
          selectedProduct.sum - selectedProduct.productPrice
        );
        updatedCartItems = { ...state.items, [action.payload]: updatedCart };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.payload];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedProduct.productPrice,
      };

    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (state.items[action.payload]) {
        return state;
      }
      const updatedItems = { ...state, items };
      const itemTotal = state.items[action.payload].sum;
      delete updatedItems[action.payload];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    default:
      return state;
  }
};
