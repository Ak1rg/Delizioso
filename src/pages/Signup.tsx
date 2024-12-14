import { useDispatch } from "react-redux"
import { changeSignup } from "../store/reducers/appReduce"
import { useAppSelector } from "../store/store"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase"
import { setUser } from "../store/reducers/userReduce"
import { Link, useNavigate } from "react-router-dom"
import { IOrder } from "../types/user"
// import Cookies from 'js-cookie';

interface IForm {
    fullName:string
    email:string
    password:string
}

interface IUserData {
    fullName:string
    email:string
    password?:string
    books?:{
        id:string 
        time:string 
        partySize:string 
        date:string
    }[]
    orders?:IOrder[]
    token?:string
    uid:string 
    date:string
}

const Signup = () => {
    const dispatch = useDispatch()
    const auth = getAuth();
    const showValue = useAppSelector(s => s.app.signup)
    const routes = useAppSelector(s => s.app.routes)
    const changeValue = (e:string) => {
        dispatch(changeSignup(e))
    }

    const [check, setCheck] = useState(false)
    const [errorForm, setErrorForm] = useState('')
    const navigate = useNavigate()

    const {register,handleSubmit,formState,reset} = useForm<IForm>({
        mode:'onChange'
    })    

    const errors = formState.errors

    const getDate = ():string => {
        const date = new Date()
        const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${date.getDate()} ${shortMonths[date.getMonth()]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    const addUser = async (userData:IUserData) => {
        try {
            await setDoc(doc(db,"users",userData.uid),userData)
            dispatch(setUser(userData))
            navigate('/Delizioso/profile')
        } catch (error) {
            if (error instanceof FirebaseError) {
                setErrorForm(`Error adding user: ${error.message}`)
            } else {
                setErrorForm(`Unknown error: ${error}`)
            }
        }
    }

    const getErrorMessage = (errorCode: string): string => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'Email already in use';
            case 'auth/invalid-credential':
                return 'Invalid email or password';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters';
            case 'auth/user-not-found':
                return 'No user found with this email';
            case 'auth/internal-error': 
                return 'The Authentication server encountered an unexpected error while trying to process the request';
            default:
                return 'Something went wrong. Please try again.';
        }
    };

    const onSubmitClick = async (data:IForm) => {
        try {
            let userCredential
            if(showValue === 'signup') {
                userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
                const user = userCredential.user;
                if (!user.email) {
                    throw new Error("User email is null or undefined.");
                }
                addUser({
                    fullName:data.fullName,
                    email:user.email,
                    books:[],
                    orders:[],
                    uid:user.uid,
                    date:getDate(),
                })
            } else if(showValue === 'login') {
                userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
                const userData = getDoc(doc(db,"users",userCredential.user.uid))
                userData.then(data => {
                    dispatch(setUser({...data.data()}))
                    navigate('/Delizioso/profile')
                })
            }
            // if (check) {
            //     Cookies.set('firebaseToken',await getToken(), { secure: true, sameSite: 'Strict', expires: 365 });
            // }
        } catch (error) {
            if (error instanceof FirebaseError) {
                setErrorForm(getErrorMessage(error.code))
            } else {
                setErrorForm("An unexpected error occurred.");
            }
        }
    };

    useEffect(() => {
        reset()
    },[showValue,reset])

    return (
        <div className="flex">
            <div className="flex flex-col xs:w-full lg:w-[45vw] px-[20px] py-[90px] justify-center">
                <Link to={routes.home}><img className="absolute top-[40px] left-[2vw]" src="./img/signup/logo.png" alt="" /></Link>
                <div className="flex flex-col gap-[15px] ml-auto mr-auto max-w-[415px] w-full">
                    <h1 className="font-raleway xs:text-[40px] lg:text-[40px] xs:leading-[47px] lg:leading-[47px] font-[700] text-colorBd">{showValue=='signup'?'Sign up':'Login'}</h1>
                    {showValue==='signup' && <p className="font-poppins xs:text-[14px] lg:text-[14px] xs:leading-[200%] lg:leading-[200%] font-[500] text-colorBd">Don't have an account? <span onClick={() => changeValue('login')} className="text-[rgb(0,148,255)] cursor-pointer">Log in</span></p>}
                    {showValue==='login' && <p className="font-poppins xs:text-[14px] lg:text-[14px] xs:leading-[200%] lg:leading-[200%] font-[500] text-colorBd">Already have an account? <span onClick={() => changeValue('signup')} className="text-[rgb(0,148,255)] cursor-pointer">Sign up</span></p>}
                </div>
                {errorForm !== '' && <p className="mt-[20px] ml-auto mr-auto max-w-[415px] w-full text-[#ff0000] font-poppins xs:text-[14px] lg:text-[14px] xs:leading-[200%] lg:leading-[200%] font-[500]">{errorForm}</p>}
                <form onSubmit={handleSubmit(onSubmitClick)} className="w-full flex flex-col items-center">
                    {showValue==='signup' && <div className="flex flex-col gap-[15px] max-w-[415px] w-full mt-[30px]">
                        <p className="font-poppins xs:text-[14px] lg:text-[14px] xs:leading-[21px] lg:leading-[21px] font-[500] text-colorBd">Full name</p>
                        <input 
                            type="text" 
                            placeholder="Full name" 
                            {...register('fullName',{
                                required:true,
                                pattern:{
                                    value:/^[a-zA-Z]+(?:\s+[a-zA-Z]+)+$/,
                                    message:'',
                                }
                            })}
                            style={{border:`solid 1px ${errors.fullName?'red':'rgb(208,204,199,0.1)'}`}}
                            className="w-full max-w-[415px] xs:px-[30px] lg:px-[30px] xs:py-[19px] lg:py-[19px] xs:text-[14px] 
                            lg:text-[14px] font-poppins font-[400] xs:leading-[21px] lg:leading-[21px] text-colorBd rounded-[10px]
                            bg-[rgb(208,204,199,0.1)]"
                        />
                    </div>}
                    <div className="flex flex-col gap-[15px] max-w-[415px] w-full mt-[30px]">
                        <p className="font-poppins xs:text-[14px] lg:text-[14px] xs:leading-[21px] lg:leading-[21px] font-[500] text-colorBd">Email address</p>
                        <input 
                            type="text" 
                            placeholder="Email address" 
                            {...register('email',{
                                required:true,
                                pattern:{
                                    value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message:''
                                }
                            })}
                            style={{border:`solid 1px ${errors.email?'red':'rgb(208,204,199,0.1)'}`}}
                            className="w-full xs:px-[30px] lg:px-[30px] xs:py-[19px] lg:py-[19px] xs:text-[14px] 
                            lg:text-[14px] font-poppins font-[400] xs:leading-[21px] lg:leading-[21px] text-colorBd rounded-[10px]
                            bg-[rgb(208,204,199,0.1)]"
                        />
                    </div>
                    <div className="flex flex-col gap-[15px] max-w-[415px] w-full mt-[30px]">
                        <p className="font-poppins xs:text-[14px] lg:text-[14px] xs:leading-[21px] lg:leading-[21px] font-[500] text-colorBd">Password</p>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            {...register('password',{
                                required:true,
                                minLength:4,
                                pattern:{
                                    value:/^[a-zA-Z0-9]+$/,
                                    message:''
                                }
                            })}
                            style={{border:`solid 1px ${errors.email?'red':'rgb(208,204,199,0.1)'}`}}
                            className="w-full max-w-[415px] xs:px-[30px] lg:px-[30px] xs:py-[19px] lg:py-[19px] xs:text-[14px] 
                            lg:text-[14px] font-poppins font-[400] xs:leading-[21px] lg:leading-[21px] text-colorBd rounded-[10px]
                            bg-[rgb(208,204,199,0.1)]"
                        />
                    </div>
                    <div className="flex gap-[15px] mt-[30px] max-w-[415px] w-full">
                        <div onClick={() => setCheck(e => !e)} className={`${check?'bg-colorBd':''} cursor-pointer flex items-center justify-center xs:min-w-[25px] lg:min-w-[25px] xs:h-[25px] lg:h-[25px] rounded-[8px] border-solid border-[1px] border-[rgb(220,212,203)]`}>
                            <img className="xs:min-w-[20px] lg:min-w-[20px] xs:h-[20px] lg:h-[20px] z-[2]" src="./img/signup/check.svg" alt="" />
                        </div>
                        <p>Remember me</p>
                    </div>
                    <button
                        type="submit"
                        className="mt-[30px] ml-auto mr-auto rounded-[10px]
                        max-w-[415px] w-full flex items-center justify-center py-[19px] 
                        font-[500] font-poppins leading-[21px] text-white bg-[#FF8A00] cursor-pointer"
                    >
                        {showValue=='signup'?'Sign up':'Log in'}
                    </button>
                </form>
                <button
                    className="mt-[30px] ml-auto mr-auto rounded-[10px]
                    max-w-[415px] w-full flex items-center justify-center py-[18px] gap-[15px]
                    font-[500] font-poppins leading-[21px] text-colorBd bg-white cursor-pointer
                    border-[rgb(182,163,139,0.8) border-[1px] border-solid"
                >
                    <img className="xs:min-w-[26px] lg:min-w-[26px] xs:h-[26px] lg:h-[26px]" src="./img/signup/google.png" alt="" />
                    {showValue=='signup'?'Sign up':'Log in'} with google
                </button>

            </div>
            <img className="w-[55vw] xs:hidden lg:flex" src="./img/signup/main.png" alt="" />
        </div>
    )
}

export default Signup