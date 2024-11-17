import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../Reducer/authSlice'
import profileReducer from '../Reducer/profileSlice'

const store= configureStore({
    reducer:{
        authentication:authReducer,
        user: profileReducer

    }
})

export default store