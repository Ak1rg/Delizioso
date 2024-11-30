import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../types/user'

const initialState: IUser = {
    books:[],
    fullName:null,
    email:null,
    uid:null,
    date:null,
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