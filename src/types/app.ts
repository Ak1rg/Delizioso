export interface IAppState {
    burger: boolean
    signup:string
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
    profile:string
}