import axios from "axios"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { changeMailState } from "../store/reducers/appReduce"
import { useAppSelector } from "../store/store"

interface IForm {
    firstName:string
    lastName:string
    email:string
    subject:string
    message:string
}

const Contact = () => {

    const dispatch = useDispatch()
    const mailState = useAppSelector(s => s.app.mailState)

    const {register,handleSubmit,formState} = useForm<IForm>({
        mode:'onChange'
    })    

    const errors = formState.errors

    const onSubmitClick = async (data: IForm) => {
        dispatch(changeMailState('loading'))
        try {
            await axios.post('/Delizioso/api/send-email', {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                subject: data.subject,
                message: data.message,
            });
            dispatch(changeMailState('success'))
        } catch (error) {
            console.error(error);
            dispatch(changeMailState('failed'))
        }
        setTimeout(() => {
            dispatch(changeMailState(null))
        }, 3000);
    };
    
    return (
        <>
            <section className="ml-auto mr-auto xs:mt-[-100px] lg:mt-[150px] mb-[100px] max-w-[1170px] w-full px-[25px]">
                <form onSubmit={handleSubmit(onSubmitClick)} className="w-full flex flex-col items-center">
                    <h1 className="font-tinos xs:text-[30px] lg:text-[80px] font-[700] xs:leading-[34px] lg:leading-[92px] text-colorBd">Contact us</h1>
                    <p className="xs:mt-[15px] lg:mt-[36px] lg:max-w-[975px] font-poppins xs:text-[16px] 
                    lg:text-[25px] font-[400] xs:leading-[18px] lg:leading-[38px] text-colorB text-center">We love hearing from our customers. Feel free to share your experience or ask any questions you may have.</p>
                    <div className="xs:mt-[30px] lg:mt-[100px] flex xs:flex-col lg:flex-row xs:gap-[20px] lg:gap-[32px] w-full">
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
                            bg-[rgb(208,204,199,0.1)]"
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
                            bg-[rgb(208,204,199,0.1)]"
                        />
                    </div>
                    <div className="xs:mt-[20px] lg:mt-[50px] flex xs:flex-col lg:flex-row xs:gap-[20px] lg:gap-[32px] w-full">
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
                            bg-[rgb(208,204,199,0.1)]"
                        />
                        <input 
                            type="text" 
                            placeholder="Subject" 
                            {...register('subject',{
                                required:true,
                                maxLength:50,
                                pattern:{
                                    value:/^\S.*$/,
                                    message:''
                                }
                            })}
                            style={{border:`solid 1px ${errors.subject?'red':'rgb(208,204,199,0.1)'}`}}
                            className="w-full xs:px-[25px] lg:px-[80px] xs:py-[18px] lg:py-[36px] xs:text-[12px] lg:text-[25px]
                            font-poppins font-[400] xs:leading-[110%] lg:leading-[18px] xs:rounded-[10px] lg:rounded-[20px]
                            bg-[rgb(208,204,199,0.1)]"
                        />
                    </div>
                    <textarea
                        {...register('message',{
                            required:true,
                            pattern:{
                                value:/^\S.*$/,
                                message:''
                            }
                        })}
                        style={{border:`solid 1px ${errors.message?'red':'rgb(208,204,199,0.1)'}`}}
                        placeholder="Message"
                        className="xs:mt-[20px] lg:mt-[50px] w-full xs:min-h-[200px] lg:min-h-[400px] 
                        xs:px-[25px] lg:px-[80px] xs:py-[16px] lg:py-[50px] xs:text-[12px] lg:text-[25px] 
                        font-poppins font-[400] xs:leading-[110%] lg:leading-[18px] xs:rounded-[10px] 
                        lg:rounded-[20px] bg-[rgb(208,204,199,0.1)]"
                    />
                    <button
                        type="submit"
                        className={`${mailState==='loading'&&'select-none'} xs:mt-[40px] lg:mt-[100px] ml-auto mr-auto rounded-[20px] w-full
                        xs:max-w-[300px] lg:max-w-[540px] lg:w-[540px] lg:px-[225px] xs:py-[17px] lg:py-[36px] xs:text-[15px] lg:text-[25px] 
                        font-[400] font-poppins leading-[110%] text-white bg-[#FF8A00] cursor-pointer`}
                    >
                        Submit
                    </button>
                </form>
            </section>
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d92773.05891196559!2d5.136499!3d43.394625!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9e741ffba78bb%3A0x2f2d103fa56a6d35!2sDelizioso!5e0!3m2!1sru!2skg!4v1732270691425!5m2!1sru!2skg" 
                width="600" 
                height="450" 
                className="border-0 w-full"  
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </>
    )
}

export default Contact