import { createSlice } from '@reduxjs/toolkit'
import { IAppState } from '../../types/app'


const initialState: IAppState = {
    burger: false,
    mailState:null,
    signup:'login',
    routes:{
        home:'/',
        menu:'/menu',
        about:'/about',
        reservation:'/reservation',
        order:'/order',
        contact:'/contact',
        login:'/login',
        signup:'/signup',
        profile:'/profile',
    }
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeBurger:(state,action) => {
            state.burger = action.payload
        },
        changeMailState:(state,action) => {
            state.mailState = action.payload
        },
        changeSignup:(state,action) => {
            state.signup = action.payload
        }
    },
})

export const {changeBurger,changeMailState,changeSignup } = appSlice.actions

export default appSlice.reducer