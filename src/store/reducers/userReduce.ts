import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../types/user'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const initialState: IUser = {
    books:[],
    orders:[],
    fullName:null,
    email:null,
    uid:null,
    date:null,
    gettingData:false,
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
            state.orders = []
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getUser.pending, (state) => {
                state.gettingData = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                return { ...state, ...action.payload, gettingData: false };
            })
            .addCase(getUser.rejected, (state) => {
                state.gettingData = false;
            })
    }
})

export const getUser = createAsyncThunk<IUser, string, { rejectValue: string }>(
    'user/getUser',
    async (userUid, { rejectWithValue }) => {
        try {
            const res = await getDoc(doc(db,'users',`${userUid}`))
            const data = res.data();
            if (!data) throw new Error('Failed to get user');
            const user:IUser = {
                fullName:data.fullName,
                email: data.email,
                uid: data.uid,  
                date: data.date,
                books:data.books,
                orders:data.orders,
                gettingData:true,
            }
            return user;
        } catch (error) {
            return rejectWithValue(String(error));
        }
    }
);


export const { setUser,removeUser } = userSlice.actions

export default userSlice.reducer