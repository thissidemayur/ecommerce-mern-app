import {createSlice} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'  // default storage is localStorage
import {persistReducer} from 'redux-persist'



const initialState = {
    selectedProduct : null,
}

const orderSlice= createSlice({
    name:"orderSlice",
    initialState,
    reducers:{
        setSelectedProduct :(state,action)=>{
            state.selectedProduct = action.payload
        } ,

        clearSelectedProduct : (state )=>{
            state.selectedProduct = null
        }
    }
    
})

const persistConfig = {
    key:'order' ,
    storage
}

// export reducer to strore so that store be clean
export const persistedOrderReducer = persistReducer(persistConfig ,orderSlice.reducer )
// reducers use directly using actions method
export const {setSelectedProduct ,clearSelectedProduct} = orderSlice.actions
// export complete orderSlice
export default orderSlice.reducer;