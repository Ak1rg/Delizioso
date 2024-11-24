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
    reservationList:IReservationObj[],
    actualId:number
}

interface IReservationObj {
    Date:string,
    Time:string,
    PartySize:string,
    id:number
}