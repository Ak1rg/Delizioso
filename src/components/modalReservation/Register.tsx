import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { IState } from "../../store/store"
import PhoneInput from "./PhoneInput"
import ModalSelect from "./modalSelect"
import { changeModalReservation, changeModalReservationConfirm } from "../../store/reducers/reservationReduce"


interface IForm {
    firstName:string
    lastName:string
    email:string
    number:string
    accasion:string
    request:string
}

const Register = () => {

    const dispatch = useDispatch()

    const [check, setcheck] = useState(false)

    const {register,handleSubmit,formState,watch} = useForm<IForm>({
        mode:'onChange'
    })  

    const info = useSelector((state:IState) => state.reservation.reservationInfo)
    const errors = formState.errors

    const onSubmitClick = async (data: IForm) => {
        dispatch(changeModalReservation('done'))
        dispatch(changeModalReservationConfirm('confirm'))
        // try {
        //     await axios.post('http://localhost:5000/send-email', {
        //         name: `${data.firstName} ${data.lastName}`,
        //         email: data.email,
        //         subject: data.subject,
        //         message: data.message,
        //     });
        // } catch (error) {
        //     console.error(error);
        // }
    };

    return (
        <>
            <h1 className="xs:[40px] lg:mt-[90px] font-tinos xs:text-[30px] lg:text-[80px] xs:leading-[115%] lg:leading-[88px] font-[700]">Reservation</h1>
            <div className="mt-[50px] max-w-[992px] w-full rounded-[20px] bg-[#8AEAFF] bg-opacity-40 xs:py-[17px] lg:py-[50px] px-[15px]">
                <p className="text-center font-poppins xs:text-[12px] lg:text-[20px] font-[400] text-colorB leading-[110%]">Due to limited availability, we can hold this table for you for <span className="font-[600]">5:00 minutes</span></p>
            </div>
            <div className="mt-[60px] max-w-[992px] w-full flex flex-col items-center">
                <h2 className="align-left font-poppins xs:text-[14px] lg:text-[25px] xs:leading-[21px] lg:leading-[38px] font-[600]">Data order</h2>
                <div className="flex gap-[40px] mt-[40px] xs:flex-col lg:flex-row">
                    <form 
                        onSubmit={handleSubmit(onSubmitClick)}
                        className="max-w-[520px]">
                        <input 
                            type="text" 
                            placeholder="First name" 
                            {...register('firstName',{
                                required:true,
                                maxLength:32,
                                pattern:{
                                    value:/^[a-zA-Z]+$/,
                                    message:''
                                }
                            })}
                            style={{border:`solid 1px ${errors.firstName?'red':'rgb(208,204,199,0.1)'}`}}
                            className="w-full xs:px-[25px] lg:px-[50px] xs:py-[18px] lg:py-[40px] xs:text-[12px] lg:text-[20px]
                            font-poppins font-[400] xs:leading-[110%] lg:leading-[110%] xs:rounded-[10px] lg:rounded-[20px]
                            bg-[#D0CCC7] bg-opacity-10"
                        />
                        <input 
                            type="text" 
                            placeholder="Last name" 
                            {...register('lastName',{
                                required:true,
                                maxLength:32,
                                pattern:{
                                    value:/^[a-zA-Z]+$/,
                                    message:''
                                }
                            })}
                            style={{border:`solid 1px ${errors.lastName?'red':'rgb(208,204,199,0.1)'}`}}
                            className="mt-[40px] w-full xs:px-[25px] lg:px-[50px] xs:py-[18px] lg:py-[40px] xs:text-[12px] lg:text-[20px]
                            font-poppins font-[400] xs:leading-[110%] lg:leading-[110%] xs:rounded-[10px] lg:rounded-[20px]
                            bg-[#D0CCC7] bg-opacity-10"
                        />
                        <PhoneInput<IForm> register={register} watch={watch} errors={errors} name="number"/>
                        <input 
                            type="text" 
                            placeholder="Email address" 
                            {...register('email',{
                                required:true,
                                maxLength:50,
                                pattern:{
                                    value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message:''
                                }
                            })}
                            style={{border:`solid 1px ${errors.email?'red':'rgb(208,204,199,0.1)'}`}}
                            className="mt-[40px] w-full xs:px-[25px] lg:px-[50px] xs:py-[18px] lg:py-[40px] xs:text-[12px] lg:text-[20px]
                            font-poppins font-[400] xs:leading-[110%] lg:leading-[110%] xs:rounded-[10px] lg:rounded-[20px]
                            bg-[#D0CCC7] bg-opacity-10"
                        />
                        <ModalSelect/>
                        <textarea
                            {...register('request',{
                                required:true,
                                pattern:{
                                    value:/^\S.*$/,
                                    message:''
                                }
                            })}
                            style={{border:`solid 1px ${errors.request?'red':'rgb(208,204,199,0.1)'}`}}
                            placeholder="Add a special request"
                            className="xs:mt-[20px] lg:mt-[50px] w-full xs:min-h-[200px] lg:min-h-[400px] 
                            xs:px-[25px] lg:px-[50px] xs:py-[18px] lg:py-[40px] xs:text-[12px] lg:text-[20px] 
                            font-poppins font-[400] xs:leading-[110%] lg:leading-[18px] xs:rounded-[10px] 
                            lg:rounded-[20px] bg-[#D0CCC7] bg-opacity-10 resize-none"
                        />
                        <div onClick={() => setcheck(e => !e)} className="flex gap-[20px] items-center mt-[60px]">
                            <div className={`${check?'bg-colorBd':''} flex items-center justify-center rounded-full border-solid border-black border-[1px] xs:min-w-[26px] lg:min-w-[44px] xs:h-[26px] lg:h-[44px]`}>
                                <img className="xs:min-w-[20px] lg:min-w-[30px] xs:h-[20px] lg:h-[30px] z-[2]" src="./img/reservation/check.svg" alt="" />
                            </div>  
                            <p className="align-left font-poppins xs:text-[12px] lg:text-[20px] xs:leading-[18px] lg:leading-[30px] font-[400] text-colorBd">Sign me up to receive dining offers and news from this restaurant by email.</p>
                        </div>
                        <button
                            type="submit"
                            className="xs:mt-[40px] lg:mt-[60px] xs:rounded-[10px] lg:rounded-[20px] w-full
                            xs:py-[21px] lg:py-[36px] xs:text-[15px] lg:text-[25px] 
                            font-[400] font-poppins leading-[110%] text-white bg-[#FF8A00] cursor-pointer"
                        >Confirm reservation</button>
                    </form>
                    <div className="xs:min-w-[250px] lg:min-w-[430px] max-w-[430px] flex flex-col items-center">
                        <div className="xs:min-w-[280px] lg:min-w-[430px] flex flex-col px-[40px] py-[35px] bg-[#D0CCC7] bg-opacity-10 rounded-[20px]">
                            <p className="font-poppins xs:text-[14px] lg:text-[25px] xs:leading-[21px] lg:leading-[38px] font-[600]">Reservation detail</p>
                            <div className="mt-[40px] flex gap-[35px]">
                                <img src="./img/reservation/icon_calender.svg" alt="" />
                                <p className="font-poppins xs:text-[12px] lg:text-[20px] xs:leading-[18px] lg:leading-[38px] font-[400]">{info.Date} february 2022</p>
                            </div>
                            <div className="mt-[25px] flex gap-[35px]">
                                <img src="./img/reservation/icon_time.svg" alt="" />
                                <p className="font-poppins xs:text-[12px] lg:text-[20px] xs:leading-[18px] lg:leading-[38px] font-[400]">{info.Time}</p>
                            </div>
                            <div className="mt-[25px] flex gap-[35px]">
                                <img src="./img/reservation/icon_people.svg" alt="" />
                                <p className="font-poppins xs:text-[12px] lg:text-[20px] xs:leading-[18px] lg:leading-[38px] font-[400]">{info.PartySize} people</p>
                            </div>
                        </div>
                        <div className="mt-[50px] flex flex-col items-center">
                            <h2 className="align-left font-poppins xs:text-[14px] lg:text-[25px] xs:leading-[21px] lg:leading-[38px] font-[600]">Restaurant information</h2>
                            <p className="mt-[40px] font-poppins xs:text-[12px] lg:text-[20px] xs:leading-[18px] lg:leading-[30px] font-[400]">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                            <p className="mt-[25px] font-poppins xs:text-[12px] lg:text-[20px] xs:leading-[18px] lg:leading-[30px] font-[400]">Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register