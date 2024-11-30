import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../types/user'


const initialState: IUser = {
    books:[
        {
            time:'12:00',
            date:'16',
            partySize:'2',
            id:123456
        },
        {
            time:'12:00',
            date:'16',
            partySize:'2',
            id:123456
        },
        {
            time:'12:00',
            date:'16',
            partySize:'2',
            id:123456
        },
        {
            time:'12:00',
            date:'16',
            partySize:'2',
            id:123456
        },
    ],
    fullName:'Alibek Eresheev',
    email:'awfawfaw',
    uid:null,
    date:'awfawfaw',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return {...state,...action.payload};
        },
        removeUser:(state) => {
            state.fullName = null;
            state.email = null
            state.date = null
            state.uid = null
            state.books = []
        },
    },
})

export const { setUser,removeUser } = userSlice.actions

export default userSlice.reducer