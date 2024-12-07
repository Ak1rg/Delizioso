import { useDispatch, useSelector } from "react-redux"
import { IState } from "../../store/store"
import Register from "./Register"
import { closeReservation } from "../../store/reducers/reservationReduce"
import { Link } from "react-router-dom"
import ConfirmPage from "./confirm/ConfirmPage"

const ModalReservation = () => {

    const dispatch = useDispatch()
    const openValue = useSelector((state:IState) => state.reservation.modalReservation) 
    const routes = useSelector((state:IState) => state.app.routes) 

    return (
        <div className={`${openValue?'flex':'hidden'} ${openValue=='done'?'lg:pb-[760px] xl:pb-[200px]':''} absolute top-0 left-0 w-full flex flex-col items-center lg:bg-colorBd lg:bg-opacity-80 z-[2] lg:p-[25px] `}>
            <div onClick={() => dispatch(closeReservation())}
            className="cursor-pointer
            xs:hidden lg:flex w-[80px] h-[80px] rounded-full bg-white mb-[30px] justify-center items-center relative">
                <div className="w-[28px] h-[2px] bg-black absolute rotate-45"></div>
                <div className="w-[28px] h-[2px] bg-black absolute -rotate-45"></div>
            </div>
            <div className="max-w-[1110px] xs:mt-[105px] lg:mt-0 w-full bg-white px-[10px] py-[60px] flex flex-col items-center relative">
                <div className="max-w-[992px] w-full flex justify-between xs:hidden lg:flex ">
                    <img src="./img/header/logo.png" alt="" />
                    <div className="flex gap-[15px]">
                        <Link to={routes.login}><button className="rounded-[160px] bg-colorO xs:py-[13px] lg:py-[14px] xs:px-[34px] lg:px-[32px] xs:text-[14px] lg:text-[14px] font-[400] font-poppins xs:leading-[180%] lg:leading-[21px] text-white ">Sign in</button></Link>
                        <Link to={routes.signup}><button className="rounded-[160px] bg-[#3FA72F] xs:py-[13px] lg:py-[14px] xs:px-[34px] lg:px-[32px] xs:text-[14px] lg:text-[14px] font-[400] font-poppins xs:leading-[180%] lg:leading-[21px] text-white ">Sign up</button></Link>
                    </div>
                </div>
                {openValue == 'register'?<Register/>:null}
                {openValue == 'done'?<ConfirmPage/>:null}
            </div>
        </div>
    )
}

export default ModalReservation