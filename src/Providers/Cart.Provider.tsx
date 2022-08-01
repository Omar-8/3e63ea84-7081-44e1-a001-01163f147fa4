import React, { createContext, FC, useReducer } from "react";
import {
  CartInitialState,
  cartReducer,
} from "../store/Cart/Reducers/cart.reducer";
import { CartState } from "../store/Cart/Types/cart.type";

type ProviderProps = {
  children: React.ReactNode;
};

type CartContextType = {
  cartState: CartState;
  cartDispatch?: any;
};

export const CartContext = createContext<CartContextType>({
  cartState: CartInitialState,
  cartDispatch: () => null,
});

export const CartProvider: FC<ProviderProps> = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, CartInitialState);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};
