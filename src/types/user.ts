import { IDishe } from "./dishes"

export interface IUser {
    fullName:string | null
    email:string | null
    uid:number | null
    date:string | null
    books:ITable[]
    orders:IOrder[]
}

export interface ITable {
    Time:string
    Date:string
    PartySize:string
    id:number
}
export interface IOrder {
    dishes:IDishe[]
    id:number
    note:string
    email:string
    orderMethod:string
}