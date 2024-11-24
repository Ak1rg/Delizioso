import { IAppState } from './../types/app';
import { IDishesState } from '../types/dishes';
import { configureStore } from '@reduxjs/toolkit'
import dishesSlice from './reducers/dishesReduce'
import appSlice from './reducers/appReduce'
import { IReservation } from '../types/reservation';
import reservationSlice from './reducers/reservationReduce';

export interface IState{
    app:IAppState
    reservation:IReservation
    dishes:IDishesState
}

export const store = configureStore({
    reducer: {
        app: appSlice,
        dishes: dishesSlice,
        reservation:reservationSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch