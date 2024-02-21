import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../feature/login/loginSlice.js'

const store = configureStore({
    reducer : {
        user : userReducer
    }
});

export default store