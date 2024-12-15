import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../store/store"
import { useForm } from "react-hook-form"
import PhoneInput from "../components/order/PhoneInput"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { doCheckout } from "../store/reducers/orderReduce"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { IOrder } from "../types/user"
import { changeMailState } from "../store/reducers/appReduce"
import axios from "axios"

interface IForm {
    firstName:string
    lastName:string
    email:string
    phone:string
    note:string
}

const Checkout = () => {

    const cart = useAppSelector(s => s.order.cart)
    const routes = useAppSelector(s => s.app.routes)
    const mailState = useAppSelector(s => s.app.mailState)
    const userData = useAppSelector(s => s.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [deliveryValue, setDeliveryValue] = useState<string>('Delivery')
    const [paymetMethod, setPaymetMethod] = useState<string>('cash')

    const {register,handleSubmit,formState,watch} = useForm<IForm>({
        mode:'onChange'
    })    

    const errors = formState.errors

    const onSubmitClick = async (data: IForm) => {
        if(userData.uid!==null){
            try {
                if(cart.length!==0){
                    if(userData.uid!==null){
                        const docRef = doc(db,'users',`${userData.uid}`)
                        const res = await getDoc(docRef);
                        const orders = res.data()?.orders
                        const updatedOrder = [...orders,{
                            dishes:cart,
                            id:(() => {
                                let uniqueNumber:number 
                                do{
                                    uniqueNumber = Math.floor(100000 + Math.random() * 900000);
                                } while (orders.some((order:IOrder) => order.id === uniqueNumber))
                                return uniqueNumber;
                            })(),
                            note:data.note,
                            email:data.email,
                            orderMethod:deliveryValue,
                        }]
                        await updateDoc(docRef,{
                            orders:updatedOrder
                        })
                        dispatch(doCheckout())
                    }
                }
            } catch (error) {
                console.error(error);
            } finally{
                navigate(routes.order)
            }
        } else {
            dispatch(changeMailState('loading'))
            try {
                await axios.post('/Delizioso/api/send-email', {
                    name: `${data.firstName} ${data.lastName}`,
                    email: data.email,
                    subject: data.phone,
                    message: data.note,
                });
                dispatch(changeMailState('success'))
            } catch (error) {
                console.error(error);
                dispatch(changeMailState('failed'))
            } finally {
                setTimeout(() => {
                    dispatch(changeMailState(null))
                }, 3000);
                navigate(routes.order)
            }
        }
    };

    return (
        <>
            <section className="ml-auto mr-auto mb-[50px] max-w-[1170px] w-full px-[25px] flex flex-col">
                <div className="relative flex items-center justify-center">
                    <Link to={routes.order}><img className="absolute left-0 xs:top-[calc(50%-15px)] lg:top-[calc(50%-25px)] cursor-pointer xs:w-[30px] lg:w-[50px] xs:h-[30px] lg:h-[50px]" src="./img/order/btn_back.svg" alt="" /></Link>
                    <h1 className="text-center font-tinos xs:text-[30px] lg:text-[80px] font-[700] xs:leading-[34px] lg:leading-[92px] text-colorBd">Checkout</h1>
                </div>
                <form className="w-full flex flex-col items-center">
                    <h2 className="xs:mt-[40px] lg:mt-[120px] font-poppins xs:text-[14px] lg:text-[30px] font-[500] xs:leading-[21px] lg:leading-[45px] text-colorBd">Order data</h2>
                    <div className="xs:mt-[20px] lg:mt-[60px] flex xs:flex-col lg:flex-row xs:gap-[20px] lg:gap-[32px] w-full">
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
                            className="w-full xs:px-[25px] lg:px-[80px] xs:py-[18px] lg:py-[36px] xs:text-[12px] lg:text-[25px]
                            font-poppins font-[400] xs:leading-[110%] lg:leading-[18px] xs:rounded-[10px] lg:rounded-[20px]
                            bg-[rgb(208,204,199)] bg-opacity-10 text-colorB"
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
                            className="w-full xs:px-[25px] lg:px-[80px] xs:py-[18px] lg:py-[36px] xs:text-[12px] lg:text-[25px]
                            font-poppins font-[400] xs:leading-[110%] lg:leading-[18px] xs:rounded-[10px] lg:rounded-[20px]
                            bg-[rgb(208,204,199)] bg-opacity-10 text-colorB"
                        />
                    </div>
                    <div className="xs:mt-[20px] lg:mt-[50px] grid xs:grid-rows-2 lg:grid-rows-1 xs:grid-cols-1 lg:grid-cols-2 xs:gap-[20px] lg:gap-[32px] w-full">
                        <PhoneInput<IForm> register={register} watch={watch} errors={errors} name="phone"/>
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
                            className="w-full xs:px-[25px] lg:px-[80px] xs:py-[18px] lg:py-[36px] xs:text-[12px] lg:text-[25px]
                            font-poppins font-[400] xs:leading-[110%] lg:leading-[18px] xs:rounded-[10px] lg:rounded-[20px]
                            bg-[rgb(208,204,199)] bg-opacity-10 text-colorB"
                        />
                    </div>
                    <textarea
                        {...register('note',{
                            required:true,
                            pattern:{
                                value:/^\S.*$/,
                                message:''
                            }
                        })}
                        style={{border:`solid 1px ${errors.note?'red':'rgb(208,204,199,0.1)'}`}}
                        placeholder="Note"
                        className="xs:mt-[20px] lg:mt-[50px] w-full xs:min-h-[200px] lg:min-h-[400px] 
                        xs:px-[25px] lg:px-[80px] xs:py-[16px] lg:py-[50px] xs:text-[12px] lg:text-[25px] 
                        font-poppins font-[400] xs:leading-[110%] lg:leading-[18px] xs:rounded-[10px] 
                        lg:rounded-[20px] bg-[rgb(208,204,199)] bg-opacity-10 text-colorB"
                    />
                </form>
            </section>
            <section className="ml-auto mr-auto mb-[50px] max-w-[1170px] w-full px-[25px] flex flex-col">
                <div>
                    <h2 className="font-poppins xs:text-[14px] lg:text-[30px] font-[500] xs:leading-[21px] lg:leading-[110%] text-colorBd">Order method</h2>
                    <div className="mt-[50px] flex items-center gap-[100px]">
                        <div className="flex items-center gap-[20px]">
                            <div onClick={() => setDeliveryValue('Delivery')}
                                style={{border:`${deliveryValue==='Delivery'?'#3FA72F':'#5C4529'} solid 1px`}}
                                className={`cursor-pointer flex items-center justify-center rounded-full xs:w-[24px] lg:w-[44px] xs:h-[24px] lg:h-[44px]`}>
                                <div className={`${deliveryValue==='Delivery'&&'bg-[#3FA72F]'} rounded-full xs:w-[16px] lg:w-[28px] xs:h-[16px] lg:h-[28px] `}></div>
                            </div>
                            <p className="font-poppins xs:text-[12px] lg:text-[25px] font-[400] xs:leading-[18px] lg:leading-[38px] text-colorB">Delivery</p>
                        </div>
                        <div className="flex items-center gap-[20px]">
                            <div onClick={() => setDeliveryValue('Take')} 
                                style={{border:`${deliveryValue==='Take'?'#3FA72F':'#5C4529'} solid 1px`}}
                                className={`cursor-pointer flex items-center justify-center rounded-full xs:w-[24px] lg:w-[44px] xs:h-[24px] lg:h-[44px]`}>
                                <div className={`${deliveryValue==='Take'&&'bg-[#3FA72F]'} rounded-full xs:w-[16px] lg:w-[28px] xs:h-[16px] lg:h-[28px]`}></div>
                            </div>
                            <p className="font-poppins xs:text-[12px] lg:text-[25px] font-[400] xs:leading-[18px] lg:leading-[38px] text-colorB">Take a way</p>
                        </div>
                    </div>
                </div>
                {deliveryValue==='Delivery'&&<div className="mt-[100px] ">
                    <h2 className="font-poppins xs:text-[14px] lg:text-[30px] font-[500] xs:leading-[21px] lg:leading-[110%] text-colorBd">Payment method</h2>
                    <div className="mt-[50px] flex flex-col gap-[40px]">
                        <div className="max-w-[540px] rounded-[20px] flex items-center gap-[20px] xs:px-[25px] lg:px-[50px] xs:py-[13px] lg:py-[28px] bg-[rgb(208,204,199,0.1)]">
                            <div onClick={() => setPaymetMethod('cash')}
                                style={{border:`${paymetMethod==='cash'?'#3FA72F':'#5C4529'} solid 1px`}}
                                className={`cursor-pointer flex items-center justify-center rounded-full xs:w-[24px] lg:w-[44px] xs:h-[24px] lg:h-[44px]`}>
                                <div className={`${paymetMethod==='cash'&&'bg-[#3FA72F]'} rounded-full xs:w-[16px] lg:w-[28px] xs:h-[16px] lg:h-[28px] `}></div>
                            </div>
                            <p className="font-poppins xs:text-[12px] lg:text-[25px] font-[400] xs:leading-[18px] lg:leading-[38px] text-colorB">Cash On Delivery</p>
                        </div>
                        <div className="max-w-[540px] rounded-[20px] flex items-center gap-[20px] xs:px-[25px] lg:px-[50px] xs:py-[13px] lg:py-[28px] bg-[rgb(208,204,199,0.1)]">
                            <div onClick={() => setPaymetMethod('card')}
                                style={{border:`${paymetMethod==='card'?'#3FA72F':'#5C4529'} solid 1px`}}
                                className={`cursor-pointer flex items-center justify-center rounded-full xs:w-[24px] lg:w-[44px] xs:h-[24px] lg:h-[44px]`}>
                                <div className={`${paymetMethod==='card'&&'bg-[#3FA72F]'} rounded-full xs:w-[16px] lg:w-[28px] xs:h-[16px] lg:h-[28px] `}></div>
                            </div>
                            <p className="font-poppins xs:text-[12px] lg:text-[25px] font-[400] xs:leading-[18px] lg:leading-[38px] text-colorB">Credit Card</p>
                        </div>
                    </div>
                </div>}
            </section>
            <section className="ml-auto mr-auto mb-[50px] max-w-[1170px] w-full px-[25px] flex flex-col">
                <button
                    onClick={handleSubmit(onSubmitClick)}
                    className={`${mailState==='loading'&&'select-none'} xs:mt-[40px] lg:mt-[50px] ml-auto mr-auto w-full rounded-[20px] xs:max-w-[300px] 
                    lg:max-w-[540px] flex justify-center xs:py-[17px] lg:py-[36px] xs:text-[15px] lg:text-[25px] 
                    font-[400] font-poppins leading-[110%] text-white bg-[#FF8A00] cursor-pointer`}
                >
                    Order now
                </button>
            </section>
        </>
    )
}

export default Checkout