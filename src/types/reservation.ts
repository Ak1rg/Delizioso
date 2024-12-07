import { ITable } from "./user";

export interface IReservation {
    reservationInfo:{
        [key: string]: string;
    },
    modalReservation:string
    modalReservationConfirm:string
    dataReservation:{
        date:string[]
        time:string[]
        partysize:string[]
    }
    reservationList:ITable[],
    actualId:number
}