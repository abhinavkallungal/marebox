import { createContext } from 'react';

export const CartContext = createContext([{ name: '', description: '', qty: '' }]);
const CartProvider = CartContext.Provider;

export const Cart = ({ children }) => {
    return(
        <CartProvider value={}>{ children }</CartProvider>
    );
};
