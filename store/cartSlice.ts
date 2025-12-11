import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";


// product - price, name, quantity, image, category

export interface CartItem {
    id: number,
    name: string,
    image: string,
    category: string,
    price: number,
    quantity: number
}

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: [],

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // if  the product is new , then add the complete item 
            const exisitingItem = state.items.find(item => item.id === action.payload.id) 
            // if the product already exists, then only increase the quantity

            if (exisitingItem) {
                exisitingItem.quantity += action.payload.quantity
            } else {
                state.items.push({...action.payload, quantity: 1})
            }
            AsyncStorage.setItem('cart' , JSON.stringify(state.items))
        },

        loadCart: (state, action) => {
            state.items = action.payload
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
            AsyncStorage.setItem('cart', JSON.stringify(state.items))
        },

        updateQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id)
            if (existingItem) {
                existingItem.quantity = action.payload.quantity
                AsyncStorage.setItem('cart', JSON.stringify(state.items))
            }
        },

        clearCart: (state) => {
            state.items = []
            AsyncStorage.setItem('cart', JSON.stringify([]))
        }
    }
})

export const { addToCart, loadCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer