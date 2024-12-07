import { IReservationObj } from './../../types/reservation';
import { createSlice } from '@reduxjs/toolkit'
import { IReservation } from '../../types/reservation';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const initialState: IReservation = {
    reservationInfo:{
        Date:'',
        Time:'',
        PartySize:'',
    },
    modalReservation:'',
    modalReservationConfirm:'',
    dataReservation:{
        date:['5','10','15','20','25','30',],
        time:['10:00','12:00','14:00','16:00','18:00','20:00',],
        partysize:['2','3','4','5','6','7',],
    },
    reservationList:[],
    actualId:0
}

export const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        changeReservationInfo:(state,action:{payload:{name:string,value:string}}) => {
            state.reservationInfo[action.payload.name] = action.payload.value
        },
        changeModalReservation:(state,action) => {
            state.modalReservation = action.payload
        },
        changeModalReservationConfirm:(state,action) => {
            state.modalReservationConfirm = action.payload
        },
        addNewReservation:(state,action) => {
            updateDoc(doc(db,'users',action.payload),{
                books:arrayUnion({
                    Date: state.reservationInfo.Date,
                    Time: state.reservationInfo.Time,
                    PartySize: state.reservationInfo.PartySize,
                    id:(() => {
                        let uniqueNumber:number 
                        do{
                            uniqueNumber = Math.floor(100000 + Math.random() * 900000);
                        } while (state.reservationList.some(reservation => reservation.id === uniqueNumber))
                        state.actualId = uniqueNumber
                        return uniqueNumber;
                    })(),
                })
            })
        },
        changeCurrentReservation:(_,action) =>{
            if(action.payload.uid!==null){
                getDoc(doc(db,'users',action.payload.uid))
                .then(e => {
                    const changedObj = e.data()?.books.map((book:IReservationObj) =>{
                        if(book.id==action.payload.actualId){
                            return {
                                ...book,
                                [action.payload.name]:action.payload.value
                            }
                        }
                        return book
                    })
                    updateDoc(doc(db,'users',action.payload.uid),{
                        books:changedObj
                    })
                })
                .catch(error => console.error(error))
            } else {
                console.log('changed')
            }
        },
        closeReservation:(state) => {
            state.reservationInfo = {
                Date:'',
                Time:'',
                PartySize:'',
            }
            state.modalReservation = ''
            state.modalReservationConfirm = ''
            state.actualId = 0
        }
    },
})

export const { changeReservationInfo,changeModalReservation,changeModalReservationConfirm,
            addNewReservation,closeReservation,changeCurrentReservation
            } = reservationSlice.actions

export default reservationSlice.reducer