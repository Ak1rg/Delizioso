import { createSlice } from '@reduxjs/toolkit'
import { IAppState } from '../../types/app'


const initialState: IAppState = {
    burger: false,
    modalReservation:false,
    mailState:null,
    routes:{
        home:'/',
        menu:'/menu',
        about:'/about',
        reservation:'/reservation',
        order:'/order',
        contact:'/contact',
        login:'/login',
        signup:'/signup'
    }
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeBurger:(state,action) => {
            state.burger = action.payload
        },
        changeModalReservation:(state,action) => {
            state.modalReservation = action.payload
        },
        changeMailState:(state,action) => {
            state.mailState = action.payload
        },
    },
})

export const {changeBurger,changeMailState,changeModalReservation} = appSlice.actions

export default appSlice.reducer