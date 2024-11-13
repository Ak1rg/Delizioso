export interface IDishesState {
    ctgrs:string[]
    dishes:IDishe[]
    cart:IDishe[]
}

export interface IDishe {
    id:number
    name:string
    price:number
    img:string
    ctgrs:string
    quantity?:number
}