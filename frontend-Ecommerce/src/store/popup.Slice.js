import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isPopupOpen : false
}

const popupSlice = createSlice({
    name:"popupSlice",
    initialState,
    reducers:{
        showPopups:(state,action)=>{
            state.isPopupOpen=true
        } ,
        hidePopups:(state, action)=>{
            state.isPopupOpen = false
            
        }
    }
})

 export const {showPopups , hidePopups} =  popupSlice.actions;
export default popupSlice.reducer