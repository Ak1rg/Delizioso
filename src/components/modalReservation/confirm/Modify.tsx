import { useDispatch, useSelector } from "react-redux"
import Select from "../../select/Select"
import { IState } from "../../../store/store"
import { changeModalReservationConfirm } from "../../../store/reducers/reservationReduce"

const Modify = () => {

    const dispatch = useDispatch()

    const info = useSelector((state:IState) => state.reservation.reservationInfo)
    const idValue = useSelector((state:IState) => state.reservation.actualId)

    const backBtn = () => {
        dispatch(changeModalReservationConfirm('confirm'))
    }

    return (
        <>
            <div className="w-full xs:mt-0 lg:mt-[50px] max-w-[992px] flex justify-center">
                <img className="absolute left-0 z-[2] xs:h-[100px] lg:h-[200px] w-full" src="./img/reservation/green_background.png" alt="" />
                <div className="xs:py-[15px] lg:py-[44px] relative z-[3]">
                    <h2 className="align-left font-poppins xs:text-[20px] lg:text-[40px] xs:leading-[21px] lg:leading-[110%] font-[600] text-white">Change detail to the reservation</h2>
                    <div className="flex gap-[16px] xs:mt-[20px] lg:mt-[20px]">
                        <img className="xs:w-[19px] lg:w-[30px] xs:h-[19px] lg:h-[30px]" src="./img/reservation/icon_booking.svg" alt="" />
                        <p className="font-poppins xs:text-[12px] lg:text-[20px] xs:leading-[18px] lg:leading-[110%] font-[400] text-white">Booking ID:#{idValue}</p>
                    </div>
                </div>
            </div>
            <div className="xs:mt-[80px] lg:mt-[40px] w-full max-w-[992px] flex xs:flex-col lg:flex-row items-center xs:gap-[20px] lg:gap-0 xs:justify-center lg:justify-between xs:mb-[101px] lg:mb-0">
                <div className="flex flex-col w-full items-center max-w-[475px]">
                    <Select placeholder={info.Date} dataValue='Date' classname="mt-[40px]"/>
                    <Select placeholder={info.Time} dataValue='Time' classname="mt-[40px]"/>
                    <Select placeholder={info.PartySize} dataValue='PartySize' classname="mt-[40px]"/>
                </div>
                <div className="flex xs:flex-row lg:flex-col xs:mt-[40px] items-center justify-center xs:gap-[10px] lg:gap-[20px]">
                    <button 
                        onClick={backBtn} 
                        className="flex justify-center rounded-[20px] bg-[rgb(0,116,255,0.2)] xs:py-[19px] lg:py-[29px] xs:px-[55px] lg:px-[90px] xs:text-[12px] lg:text-[20px] font-[400] font-poppins xs:leading-[110%] lg:leading-[110%] text-[#123968]">
                        Back
                    </button>
                </div>
            </div>
        </>
    )
}

export default Modify