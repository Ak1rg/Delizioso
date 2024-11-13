import { IAppState } from './../types/app';
import { IDishesState } from '../types/dishes';
import { configureStore } from '@reduxjs/toolkit'
import dishesSlice from './reducers/dishesReduce'
import appSlice from './reducers/appReduce'

export interface IState{
    app:IAppState
    dishes:IDishesState
}

export const store = configureStore({
    reducer: {
        app: appSlice,
        dishes: dishesSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch