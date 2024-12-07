import { useDispatch, useSelector } from "react-redux"
import ModalReservation from "../components/modalReservation/modalReservation"
import Select from "../components/select/Select"
import { IState, useAppSelector } from "../store/store"
import { addNewReservation, changeModalReservation, changeModalReservationConfirm } from "../store/reducers/reservationReduce"

const Reservation = () => {

    const dispatch = useDispatch()

    const openValue = useSelector((state:IState) => state.reservation.modalReservation)
    const info = useSelector((state:IState) => state.reservation.reservationInfo)
    const user = useAppSelector(s => s.user.uid)

    const openModal = () => {
        if(info.Date !== '' && info.Time !== '' && info.PartySize !== '') {
            if(user!==null){
                dispatch(addNewReservation(user))
                dispatch(changeModalReservationConfirm('confirm'))
                dispatch(changeModalReservation('done'))
            } else {
                dispatch(changeModalReservation('register'))
            }
        }
    }


    return (
        <>
            <section className={`relative ml-auto mr-auto max-w-[1170px] w-full px-[25px] flex items-center
            justify-end xs:flex-col xl:flex-row ${openValue == 'register'?'xs:mb-[850px] lg:mb-[570px] xl:mb-[1200px]':''}
            ${openValue=='done'?'xs:mb-[0px] lg:mb-[0px] xl:mb-[0px]':''}`}>
                <div className="absolute ml-auto mr-auto xl:left-[-130px] xs:top-[-80px] xl:top-[40px]">
                    <img className="border-[rgb(208,204,199,0.2)] xs:border-[30px] lg:border-[50px] border-solid rounded-[100%] xs:w-[230px] xs:h-[230px] lg:w-[626px] lg:h-[626px]" src="./img/reservation/main_img.png" alt="" />
                </div>
                <div className="flex flex-col max-w-[475px] xs:mt-[220px] lg:mt-[650px] xl:mt-[20px] mb-[100px]">
                    <h1 className="font-tinos xs:text-[30px] lg:text-[80px] xs:leading-[34px] lg:leading-[110%] font-[700] text-colorBd">Book a table</h1>
                    <Select placeholder={'Date'} dataValue='Date' classname="mt-[40px]"/>
                    <Select placeholder={'Time'} dataValue='Time' classname="mt-[40px]"/>
                    <Select placeholder={'Party size'} dataValue='PartySize' classname="mt-[40px]"/>
                    <button 
                        onClick={openModal}
                        className="mt-[40px] rounded-[20px] border-[colorB] bg-colorO xs:py-[13px] lg:py-[36px] xs:px-[34px] lg:px-[176px] xs:text-[16px] lg:text-[25px] font-[600] font-poppins leading-[110%] text-white "
                    >Book now</button>
                </div>
            </section>
            <ModalReservation/>
        </>
    )
}

export default Reservation