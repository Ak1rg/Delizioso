import { useDispatch } from "react-redux"
import { useAppSelector } from "../../../store/store"
import { changeModalReservationConfirm, closeReservation, removeReservation } from "../../../store/reducers/reservationReduce"

const Cancel = () => {

    const info = useAppSelector(s => s.reservation.reservationInfo)
    const idValue = useAppSelector(s => s.reservation.actualId)
    const user = useAppSelector(s => s.user.uid)
    const dispatch = useDispatch()

    const backBtn = () => {
        dispatch(changeModalReservationConfirm('confirm'))
    }

    const cancelBtn = () => {
        dispatch(removeReservation({uid:user,actualId:idValue}))
        dispatch(closeReservation())
    }

    return (
        <>
            <div className="w-full xs:mt-0 lg:mt-[50px] max-w-[992px] flex justify-center">
                <img className="absolute left-0 z-[2] xs:h-[100px] lg:h-[200px] w-full" src="./img/reservation/cancel_background.png" alt="" />
                <div className="xs:py-[15px] lg:py-[44px] relative z-[3]">
                    <h2 className="align-left font-poppins xs:text-[20px] lg:text-[40px] xs:leading-[21px] lg:leading-[110%] font-[600] text-white">Are you sure you want to cancel the reservation?</h2>
                    <div className="flex gap-[16px] xs:mt-[20px] lg:mt-[20px]">
                        <img className="xs:w-[19px] lg:w-[30px] xs:h-[19px] lg:h-[30px]" src="./img/reservation/icon_booking.svg" alt="" />
                        <p className="font-poppins xs:text-[12px] lg:text-[20px] xs:leading-[18px] lg:leading-[110%] font-[400] text-white">Booking ID:#{idValue}</p>
                    </div>
                </div>
            </div>
            <div className="mt-[80px] w-full max-w-[992px] flex xs:flex-col lg:flex-row items-center xs:gap-[20px] lg:gap-0 xs:justify-center lg:justify-between xs:mb-[101px] lg:mb-0">
                <img className="rounded-[100%] xs:w-[135px] xs:h-[135px] lg:w-[210px] lg:h-[210px]" src="./img/reservation/main_img.png" alt="" />
                <div className="w-full max-w-[325px] flex flex-col px-[40px] py-[10px] rounded-[20px]">
                    <p className="font-poppins xs:text-[14px] lg:text-[25px] xs:leading-[21px] lg:leading-[38px] font-[600] text-colorBd">Reservation detail</p>
                    <div className="mt-[25px] flex gap-[20px] items-center">
                        <img src="./img/reservation/icon_calender.svg" alt="" />
                        <p className="font-poppins xs:text-[12px] lg:text-[20px] xs:leading-[18px] lg:leading-[38px] font-[400] text-colorB">{info.Date} february 2022</p>
                    </div>
                    <div className="mt-[20px] flex gap-[20px] items-center">
                        <img src="./img/reservation/icon_time.svg" alt="" />
                        <p className="font-poppins xs:text-[12px] lg:text-[20px] xs:leading-[18px] lg:leading-[38px] font-[400] text-colorB">{info.Time}</p>
                    </div>
                    <div className="mt-[20px] flex gap-[20px] items-center">
                        <img src="./img/reservation/icon_people.svg" alt="" />
                        <p className="font-poppins xs:text-[12px] lg:text-[20px] xs:leading-[18px] lg:leading-[38px] font-[400] text-colorB">{info.PartySize} people</p>
                    </div>
                </div>
                <div className="flex xs:flex-row lg:flex-col xs:gap-[10px] lg:gap-[20px]">
                    <button onClick={backBtn} 
                    className="flex justify-center rounded-[20px] bg-[rgb(0,116,255,0.2)] xs:py-[19px] lg:py-[29px] xs:px-[55px] lg:px-[90px] xs:text-[12px] lg:text-[20px] font-[400] font-poppins xs:leading-[110%] lg:leading-[110%] text-[#123968]">
                        Back
                    </button>
                    <button onClick={cancelBtn}
                    className="flex justify-center rounded-[20px] bg-[rgb(255,0,0,0.1)] xs:py-[19px] lg:py-[29px] xs:px-[55px] lg:px-[90px] xs:text-[12px] lg:text-[20px] font-[400] font-poppins xs:leading-[110%] lg:leading-[110%] text-[#EA1010]">
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}

export default Cancel