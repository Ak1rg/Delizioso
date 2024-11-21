export interface IAppState {
    burger: boolean
    modalReservation:boolean
    mailState:null | string
    routes:IRoute
}

interface IRoute {
    home:string
    menu:string
    about:string
    reservation:string
    order:string
    contact:string
    login:string
    signup:string
}