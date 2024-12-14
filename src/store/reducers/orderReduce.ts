import { createSlice } from '@reduxjs/toolkit'
import { IOrderState } from '../../types/order';


const initialState: IOrderState = {
    cart:[]
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addToCart:(state,action) => {
            if (state.cart.some(item => item.name === action.payload.name)){
                state.cart = state.cart.map(item =>
                    item.name === action.payload.name
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                state.cart.push(action.payload)
            }
        },
        changeQuantity:(state,action) => {
            state.cart.forEach(item => {
                if (item.id === action.payload.id) {
                    if (action.payload.oper === 'plus') {
                        item.quantity = (item.quantity ?? 0) + 1;
                    } else {
                        item.quantity = Math.max((item.quantity ?? 0) - 1, 0);
                    }
                }
            });
        },
        removeFromCart:(state,action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },
        doCheckout:(state) => {
            state.cart = []
        }
    },
})

export const { addToCart,changeQuantity,removeFromCart,doCheckout } = orderSlice.actions

export default orderSlice.reducer