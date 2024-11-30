export interface IUser {
    fullName:string | null
    email:string | null
    uid:number | null
    date:string | null
    books:ITable[]
}

export interface ITable {
    time:string
    date:string
    partySize:string
    id:number
}