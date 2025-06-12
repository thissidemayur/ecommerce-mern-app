import {createSlice} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'

const initialState = {
    items:[] // [{ productId, productName, price, size, quantity, productImg }]
}

const cartSlice = createSlice({
    name:"cartSlice",
    initialState,
    reducers:{
        addToCart : (state ,action)=>{
            const {productImg,price,productName,size,productId ,quantity} = action.payload
            const existingItem = state.items.find(
                (find)=>find.productId === productId && find.size ===size
            )
            if(existingItem) existingItem.quantity+=1;
            else {
                state.items.push({
                    productId,
                    productName,
                    quantity,
                    size,
                    price,
                    productImg
                })
            }
        } ,

        updateQuantity:(state ,action)=>{
            const {productId,size,quantity} = action.payload
            const item = state.items.find(
                (item)=>item.productId ===productId && item.size ===size
            )
            if(item && quantity>0) {
                item.quantity+=quantity
            } 
        } ,

        removeFromCart:(state,action)=>{
            const {productId , size} = action.payload
            state.items = state.items.filter(
                (item)=>!(item.productId ===productId && item.size === size)
            )
        },

        clearCart:(state)=>{
            state.items = null
        }

    }
})



const persistConfig = {
    key:'cart',
    storage
}

export const persistedCartReducer = persistReducer(persistConfig,cartSlice.reducer)
export const {addToCart ,updateQuantity,removeFromCart,clearCart} = cartSlice.actions
export default cartSlice.reducer