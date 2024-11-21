import { useDispatch, useSelector } from "react-redux"
import ModalReservation from "../components/modalReservation/modalReservation"
import Select from "../components/select/Select"
import { changeModalReservation } from "../store/reducers/appReduce"
import { IState } from "../store/store"
import { useState } from "react"

const Reservation = () => {

    const dispatch = useDispatch()

    const [info, setinfo] = useState<{ Date: string; Time: string; PartySize: string }>({
        Date:'',
        Time:'',
        PartySize:'',
    })

    console.log(info)

    const openValue = useSelector((state:IState) => state.app.modalReservation)

    const arrs = {
        date:['5','10','15','20','25','30',],
        time:['10:00','12:00','14:00','16:00','18:00','20:00',],
        group:['2','3','4','5','6','7',],
    }


    return (
        <>
            <section className={`relative ml-auto mr-auto max-w-[1170px] w-full px-[25px] flex items-center
            justify-end xs:flex-col xl:flex-row ${openValue?'xs:mb-[850px] lg:mb-[570px] xl:mb-[1200px]':''}`}>
                <div className="absolute ml-auto mr-auto xl:left-[-130px] xs:top-[-80px] xl:top-[40px]">
                    <img className="border-[rgb(208,204,199,0.2)] xs:border-[30px] lg:border-[50px] border-solid rounded-[100%] xs:w-[230px] xs:h-[230px] lg:w-[626px] lg:h-[626px]" src="./img/reservation/main_img.png" alt="" />
                </div>
                <div className="flex flex-col max-w-[475px] xs:mt-[220px] lg:mt-[650px] xl:mt-[20px] mb-[100px]">
                    <h1 className="font-tinos xs:text-[30px] lg:text-[80px] xs:leading-[34px] lg:leading-[110%] font-[700] text-colorBd">Book a table</h1>
                    <Select placeholder={'Date'} arr={arrs.date} classname="mt-[40px]" change={(updater) => setinfo((prev) => ({ ...prev, ...updater }))}/>
                    <Select placeholder={'Time'} arr={arrs.time} classname="mt-[40px]" change={(updater) => setinfo((prev) => ({ ...prev, ...updater }))}/>
                    <Select placeholder={'Party size'} arr={arrs.group} classname="mt-[40px]" change={(updater) => setinfo((prev) => ({ ...prev, ...updater }))}/>
                    <button 
                        onClick={() => dispatch(changeModalReservation(true))}
                        className="mt-[40px] rounded-[20px] border-[colorB] bg-colorO xs:py-[13px] lg:py-[36px] xs:px-[34px] lg:px-[176px] xs:text-[16px] lg:text-[25px] font-[600] font-poppins leading-[110%] text-white ">Book now</button>
                </div>
            </section>
            <ModalReservation/>
        </>
    )
}

export default Reservation