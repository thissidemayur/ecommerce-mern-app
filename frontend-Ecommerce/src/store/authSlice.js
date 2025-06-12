import { createSlice } from "@reduxjs/toolkit";
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const initialState = {
    userDetail: null , // {userId ,fullName, email , userImg}
    status: false
}


const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {

        login: (state, action) => {
            const {email,phoneNumber,fullName,_id,userImg} = action.payload
            state.userDetail = {
                email , phoneNumber,fullName,id:_id,userImg
            }
            console.log("aithSLice login: ",state.userDetail)
            state.status = true
        },
        logOut: (state) => {
            state.userDetail = {
                email: null,
                phoneNumber: null,
                fullName: null,
                id: null,
                userImg:null
            }
            state.status = false
        }
    }
})

const persistConfig = {
    storage ,
    key:'auth'
}

export const persistedAuthReducer = persistReducer(persistConfig ,authSlice.reducer )
export const { login, logOut } = authSlice.actions
export default authSlice.reducer
