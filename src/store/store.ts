import { IAppState } from './../types/app';
import { IDishesState } from '../types/dishes';
import { configureStore } from '@reduxjs/toolkit'
import dishesSlice from './reducers/dishesReduce'
import appSlice from './reducers/appReduce'
import { IReservation } from '../types/reservation';
import reservationSlice from './reducers/reservationReduce';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { IUser } from '../types/user';
import userSlice from './reducers/userReduce';
import orderSlice from './reducers/orderReduce';
import { useDispatch } from 'react-redux';

export interface IState{
    app:IAppState
    reservation:IReservation
    dishes:IDishesState
    User:IUser
}

export const store = configureStore({
    reducer: {
        app: appSlice,
        dishes: dishesSlice,
        reservation:reservationSlice,
        user:userSlice,
        order:orderSlice,
    },
})

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>
