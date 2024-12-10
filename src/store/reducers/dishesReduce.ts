import { createSlice } from '@reduxjs/toolkit'
import { IDishesState } from '../../types/dishes'


const initialState: IDishesState = {
    dishes:[
        {
            id: 1,
            name: 'Spaghetti',
            price: 12.05,
            img: './img/dishes/spaghetti.png',
            ctgrs: 'dinner'
        },
        {
            id: 2,
            name: 'Gnocchi',
            price: 18.70,
            img: './img/dishes/gnocchi.png',
            ctgrs: 'dinner'
        },
        {
            id: 3,
            name: 'Ravioli',
            price: 14.50,
            img: './img/dishes/rovioli.png',
            ctgrs: 'dinner'
        },
        {
            id: 4,
            name: 'Penne Alla',
            price: 14.95,
            img: './img/dishes/penne.png',
            ctgrs: 'dinner'
        },
        {
            id: 5,
            name: 'Risotto',
            price: 16.20,
            img: './img/dishes/risoto.png',
            ctgrs: 'dinner'
        },
        {
            id: 6,
            name: 'Splitza',
            price: 13.80,
            img: './img/dishes/splitza.png',
            ctgrs: 'lunch'
        },
        {
            id: 7,
            name: 'Bucatini',
            price: 12.80,
            img: './img/dishes/bucatini.png',
            ctgrs: 'dinner'
        },
        {
            id: 8,
            name: 'Cappelini',
            price: 16.45,
            img: './img/dishes/cappelini.png',
            ctgrs: 'dinner'
        },
        {
            id: 9,
            name: 'Farfalle',
            price: 11.20,
            img: './img/dishes/farfalle.png',
            ctgrs: 'lunch'
        },
        {
            id: 10,
            name: 'Fettuccine',
            price: 15.20,
            img: './img/dishes/fettuccine.png',
            ctgrs: 'dessert'
        },
        {
            id: 11,
            name: 'Fusilli',
            price: 19.90,
            img: './img/dishes/fusilli.png',
            ctgrs: 'drink'
        },
        {
            id: 12,
            name: 'Linguine',
            price: 14.90,
            img: './img/dishes/linguine.png',
            ctgrs: 'dessert'
        },
        {
            id: 13,
            name: 'Focaccia',
            price: 17.50,
            img: './img/dishes/splitza.png',
            ctgrs: 'lunch'
        },
        {
            id: 14,
            name: 'Minestrone Soup',
            price: 19.10,
            img: './img/dishes/penne.png',
            ctgrs: 'lunch'
        },
        {
            id: 15,
            name: 'Grilled Salmon',
            price: 19.99,
            img: './img/dishes/gnocchi.png',
            ctgrs: 'dinner'
        },
        {
            id: 16,
            name: 'Pineapple',
            price: 15.30,
            img: './img/dishes/risoto.png',
            ctgrs: 'drink'
        },
        {
            id: 17,
            name: 'Frittata',
            price: 12.50,
            img: './img/dishes/spaghetti.png',
            ctgrs: 'lunch'
        },
        {
            id: 18,
            name: 'Margherita Pizza',
            price: 13.50,
            img: './img/dishes/rovioli.png',
            ctgrs: 'dinner'
        }
    ],
    ctgrs:['Dinner','Lunch','Dessert','Drink',],
}

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
    },
})

// export const { } = dishesSlice.actions

export default dishesSlice.reducer