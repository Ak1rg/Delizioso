import { createSlice } from '@reduxjs/toolkit'
import { IAppState } from '../../types/app'


const initialState: IAppState = {
    burger: false,
    routes:{
        home:'/',
        menu:'/menu',
        about:'/about',
        reservation:'/reservation',
        order:'/order',
        contact:'/contact',
    }
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeBurger:(state,action) => {
            state.burger = action.payload
        }
    },
})

export const {changeBurger} = appSlice.actions

export default appSlice.reducer