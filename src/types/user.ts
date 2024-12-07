export interface IUser {
    fullName:string | null
    email:string | null
    uid:number | null
    date:string | null
    books:ITable[]
}

export interface ITable {
    Time:string
    Date:string
    PartySize:string
    id:number
}