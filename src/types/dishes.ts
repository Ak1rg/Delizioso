export interface IDishesState {
    ctgrs:string[]
    dishes:IDishe[]
}

interface IDishe {
    id:number
    name:string
    price:number
    img:string
    ctgrs:string
}