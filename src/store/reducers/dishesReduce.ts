import { createSlice } from '@reduxjs/toolkit'

export interface IDishe {
    id:number
    name:string
    price:number
    img:string
    ctgrs:string
}

export interface IDishesState {
    burger: boolean
    ctgrs:string[]
    dishes:IDishe[]
}

const initialState: IDishesState = {
    burger: false,
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
            name: 'Lasagna',
            price: 17.50,
            img: './img/dishes/penne.png',
            ctgrs: 'dinner'
        },
        {
            id: 8,
            name: 'Carbonara',
            price: 15.25,
            img: './img/dishes/spaghetti.png',
            ctgrs: 'dinner'
        },
        {
            id: 9,
            name: 'Caprese Salad',
            price: 11.90,
            img: './img/dishes/risoto.png',
            ctgrs: 'lunch'
        },
        {
            id: 10,
            name: 'Tiramisu',
            price: 18.50,
            img: './img/dishes/gnocchi.png',
            ctgrs: 'dessert'
        },
        {
            id: 11,
            name: 'Cappuccino',
            price: 14.20,
            img: './img/dishes/rovioli.png',
            ctgrs: 'drink'
        },
        {
            id: 12,
            name: 'Panna Cotta',
            price: 16.90,
            img: './img/dishes/spaghetti.png',
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
    ctgrs:['Dinner','Lunch','Dessert','Drink',]
}

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        changeBurger:(state,action) => {
            state.burger = action.payload
        }
    },
})

export const {changeBurger} = dishesSlice.actions

export default dishesSlice.reducer