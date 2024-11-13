export interface IAppState {
    burger: boolean
    routes:IRoute
}

interface IRoute {
    home:string
    menu:string
    about:string
    reservation:string
    order:string
    contact:string
}