import { createSlice } from '@reduxjs/toolkit'
import { IAppState } from '../../types/app'


const initialState: IAppState = {
    burger: false,
    mailState:null,
    signup:'login',
    routes:{
        home:'/Delizioso/',
        menu:'/Delizioso/menu',
        about:'/Delizioso/about',
        reservation:'/Delizioso/reservation',
        order:'/Delizioso/order',
        contact:'/Delizioso/contact',
        login:'/Delizioso/login',
        signup:'/Delizioso/signup',
        profile:'/Delizioso/profile',
        checkout:'/Delizioso/checkout',
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