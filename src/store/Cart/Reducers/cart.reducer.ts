import { CartActionKind, CartActionTypes } from "../Actions/cart.action";
import { CartState } from "../Types/cart.type";

export const CartInitialState: CartState = {
  cartOpen: false,
  events: [],
};

export const cartReducer = (state: CartState, action: CartActionTypes) => {
  switch (action.type) {
    case CartActionKind.OPEN:
      return {
        ...state,
        cartOpen: true,
      };
    case CartActionKind.CLOSE:
      return {
        ...state,
        cartOpen: false,
      };
    case CartActionKind.ADD:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case CartActionKind.REMOVE:
      const index = state.events.indexOf(action.payload);
      if (index > -1) {
        state.events.splice(index, 1)
      }
      return {
        ...state,
      };
    default:
      return state;
  }
};
