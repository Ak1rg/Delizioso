import { useEffect, useState } from "react";
import { IDishe } from "../../types/dishes";
import { addToCart, changeQuantity, removeFromCart } from "../../store/reducers/orderReduce";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAppSelector } from "../../store/store";
import { useDispatch } from "react-redux";
import styles from './catalog.module.css'
import { useNavigate } from "react-router-dom";

const OrderCatalog = () => {

    const dispatch = useDispatch()

    const ctgrs = useAppSelector(s => s.dishes.ctgrs)
    const cart = useAppSelector(s => s.order.cart)
    const routes = useAppSelector(s => s.app.routes)
    const navigate = useNavigate()

    const getDishes = async () => {
        try {
            const res = await getDoc(doc(db, 'app', 'app'));
            const fetchedDishes = res.data()?.catalog || [];
            setDishes(fetchedDishes);
            setFilteredDishes(fetchedDishes);
        } catch (error) {
            console.error(error);
            setDishes([]);
            setFilteredDishes([]);
        } finally {
            setisLoading(false);
        }
    };


    const [dishes, setDishes] = useState<IDishe[]>([])
    const [isLoading, setisLoading] = useState<boolean>(true)
    const [activeCtgr, setActiveCtgr] = useState<string>('')
    const [voucherCode, setVoucherCode] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [filteredDishes, setFilteredDishes] = useState<IDishe[]>(dishes)
    const [pages, setPages] = useState<number>(1)

    const [voucherValue, setVoucherValue] = useState<number>(0)
    const [voucherUsed, setVoucherUsed] = useState<string[]>([])

    const subTotalValue = cart.reduce((acc:number,dishe:IDishe) => acc+=(dishe.quantity??1)*dishe.price,0)
    const taxValue = cart.reduce((acc:number) => acc+=1.5,0)

    const changeActiveCtgr = (e:string) => {
        setActiveCtgr(e)
    }
    const changeCurrentPage = (a:string) => {
        if(a == 'plus' && currentPage < pages) {
            setCurrentPage(e => e+1)
        } else if (a == 'minus' && currentPage > 1) {
            setCurrentPage(e => e-1)
        }
        setPages(Math.ceil(filteredDishes.length/6));
    }
    const addCart = (e:IDishe):void => {
        const newObj = {...e,quantity:1}
        dispatch(addToCart(newObj))
    }
    const checkVoucherCode = async () => {
        const res = await getDoc(doc(db,'app','app'))
        const code = voucherCode.toLowerCase()
        if(res.data()?.voucherCodes.includes(code) && 
        !voucherUsed.includes(code) &&
        voucherUsed.length < 2){
            setVoucherValue(num => num + 5)
            setVoucherCode('')
            setVoucherUsed(arr => [...arr,code])
        }
    }
    const toCheckout = () => {
        if(cart.length!==0){
            navigate(routes.checkout)
        }
    }

    useEffect(() => {
        getDishes()
    },[])

    useEffect(() => {
        setPages(Math.ceil(filteredDishes.length/6))
        if(currentPage > pages) {
            setCurrentPage(1)
        }
    },[filteredDishes,currentPage,pages])

    useEffect(() => {
        if (activeCtgr === '' || activeCtgr.toLowerCase() === 'all') {
            setFilteredDishes(dishes);
        } else {
            setFilteredDishes(dishes.filter((e:IDishe) => e.ctgrs.toLowerCase() === activeCtgr.toLowerCase()));
        }
    }, [dishes,activeCtgr]);

    return (
        <>
            <div className="overflow-hidden -mx-[25px]">
                <div className="mt-[60px] overflow-x-auto flex sm:justify-center xs:gap-[10px] md:gap-[15px] lg:gap-[27px] px-[25px]">
                <button className={`
                            rounded-[162px] xs:px-[19px] lg:px-[30px] xl:px-[54px] xs:py-[10px] lg:py-[12px] xl:py-[17px]
                            font-poppins xs:text-[13px] lg:text-[20px] font-[600] xs:leading-[110%]
                            lg:leading-[200%] whitespace-nowrap
                            `}
                            style={{
                                backgroundColor: '' === activeCtgr ? '#311F09' : 'rgb(208, 204, 199,0.1)',
                                color:'' === activeCtgr ? 'white' : 'black',
                            }}
                            onClick={() => changeActiveCtgr('')}
                            >All category</button>
                    {
                        ctgrs.map(ctgr => (
                            <button key={ctgr} className={`
                            rounded-[162px] xs:px-[19px] lg:px-[30px] xl:px-[54px] xs:py-[10px] lg:py-[12px] xl:py-[17px]
                            font-poppins xs:text-[13px] lg:text-[20px] font-[600] xs:leading-[110%]
                            lg:leading-[200%] whitespace-nowrap
                            `}
                            style={{
                                backgroundColor: ctgr === activeCtgr ? '#311F09' : 'rgb(208, 204, 199,0.1)',
                                color:ctgr === activeCtgr ? 'white' : 'black',
                            }}
                            onClick={() => changeActiveCtgr(ctgr)}
                            >{ctgr}</button>
                        ))
                    }
                </div>
            </div>
            <div className={`mr-auto ml-auto xs:mt-[30px] lg:mt-[60px] flex xs:items-center lg:items-start xs:flex-col lg:flex-row gap-[40px]`} >
                <div>
                    <div className={`${styles.catalog} grid xs:gap-[15px] lg:gap-[30px] max-w-[720px]`}>
                        {
                            !isLoading&&filteredDishes.slice(currentPage*6-6,currentPage*6).map((e:IDishe) => (
                                <div key={e.id} className="group hover:bg-colorO duration-200 max-h-[410px] xs:max-w-[155px] lg:max-w-[220px] flex flex-col items-center bg-[rgb(208,204,199,0.1)] xs:rounded-[18px] lg:rounded-[44px] xs:px-[13px] lg:px-[21px] xs:py-[12px] lg:py-[21px]">
                                    <img src={e.img} className="w-full xs:w-[114px] lg:w-[175px] xs:h-[114px] lg:h-[175px]" alt="" />
                                    <p className="text-center font-poppins xs:text-[14px] lg:text-[20px] xs:leading-[21px] lg:leading-[200%] font-[600] text-colorBd group-hover:text-white duration-200">{e.name}</p>
                                    <div className="mt-[5px] flex gap-[10px]">
                                        {
                                            Array(5).fill(null).map((_,i) => (
                                                <svg key={i} className="xs:w-[9px] lg:w-[12px] xs:h-[9px] lg:h-[12px]" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path className="fill-[#FF8A00] group-hover:fill-colorBd duration-200" d="M6.7186 1.23748C7.2467 -0.387848 9.54611 -0.387847 10.0742 1.23748L10.7729 3.38771C11.009 4.11458 11.6864 4.60671 12.4507 4.60671H14.7115C16.4205 4.60671 17.1311 6.79357 15.7485 7.79808L13.9194 9.127C13.3011 9.57623 13.0424 10.3725 13.2785 11.0994L13.9772 13.2496C14.5053 14.8749 12.645 16.2265 11.2624 15.222L9.43334 13.8931C8.81503 13.4438 7.97778 13.4438 7.35946 13.8931L5.53037 15.222C4.14778 16.2265 2.28752 14.8749 2.81562 13.2496L3.51428 11.0994C3.75045 10.3725 3.49172 9.57623 2.87341 9.127L1.04432 7.79808C-0.33827 6.79357 0.372286 4.60671 2.08126 4.60671H4.34214C5.10642 4.60671 5.78377 4.11458 6.01995 3.38771L6.7186 1.23748Z" fill="white"/>
                                                </svg>
                                            ))
                                        }
                                    </div>
                                    <p className="xs:mt-[12px] lg:mt-[15px] xs:max-w-[150px] lg:max-w-[170px] line-clamp-2 lg:line-clamp-none w-full overflow-hidden xs:text-ellipsis text-center font-poppins xs:text-[12px] lg:text-[12px] xs:leading-[120%] lg:leading-[18px] font-[400] text-[#59442B] duration-200 group-hover:text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas consequat.</p>
                                    <div className="xs:mt-[14px] lg:mt-[30px] max-w-[283px] flex justify-between w-full items-center">
                                        <p className="font-poppins xs:text-[16px] lg:text-[18px] xs:leading-[24px] lg:leading-[27px] font-[600] text-colorBd duration-200 group-hover:text-white">${e.price.toFixed(2)}</p>
                                        <button onClick={() => addCart(e)} className="xs:hidden lg:block rounded-[105px]  bg-colorO  py-[9px] px-[20px] text-[12px] font-[600] font-poppins lg:leading-[18px] text-white group-hover:bg-white group-hover:text-colorO duration-200">Add to cart</button>
                                        <button onClick={() => addCart(e)} className="xs:block lg:hidden w-[34px] h-[34px] rounded-[100%] flex items-center justify-center bg-colorO group-hover:bg-white duration-200">
                                            <div className="flex flex-col items-center justify-center relative">
                                                <div className="bg-white w-[12px] h-[1.5px] rounded-[50px] absolute group-hover:bg-colorO duration-200"></div>
                                                <div className="bg-white w-[11px] h-[1.5px] rounded-[50px] absolute rotate-90 left-[11.5px] group-hover:bg-colorO duration-200"></div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        {isLoading&&<img className="my-[80px] ml-auto mr-auto xs:w-[50px] xs:h-[50px] lg:w-[100px] lg:h-[100px] animate-spin" src="./img/profile/refresh.svg" alt="" />}
                    </div>
                    {pages>1&&<div className="w-full flex justify-center mr-auto ml-auto xs:mt-[25px] lg:mt-[50px] gap-[15px] max-w-[350px]">
                            <div 
                            onClick={() => changeCurrentPage('minus')}
                            className=" cursor-pointer bg-colorBd xs:rounded-[8px] lg:rounded-[15px] xs:w-[35px] lg:w-[55px] xs:h-[35px] lg:h-[55px] relative">
                                <div className="xs:w-[10px] lg:w-[15px] h-[2px] xs:top-[20px] lg:top-[30px] xs:left-[13px] lg:left-[21px] bg-white absolute rotate-45"></div>
                                <div className="xs:w-[10px] lg:w-[15px] h-[2px] xs:top-[13.5px] lg:top-[21px] xs:left-[13px] lg:left-[21px] bg-white absolute rotate-[135deg]"></div>
                            </div>
                            {
                                Array(pages).fill(null).map((_,i) => (
                                    <div key={i} 
                                    onClick={() => setCurrentPage(i+1)}
                                    className={`${i+1===currentPage?'bg-colorBd text-white':'bg-[rgb(255,138,0,0.1)] text-colorO'}
                                    flex items-center cursor-pointer justify-center xs:w-[35px] lg:w-[55px] xs:h-[35px] lg:h-[55px] 
                                    font-poppins xs:text-[12px] lg:text-[16px] xs:leading-[20px] lg:leading-[200%] font-[600] 
                                    xs:rounded-[8px] lg:rounded-[15px]`}>
                                        {i+1}
                                    </div>
                                ))
                            }
                        <div 
                            onClick={() => changeCurrentPage('plus')}
                            className=" cursor-pointer bg-colorBd xs:rounded-[8px] lg:rounded-[15px] xs:w-[35px] lg:w-[55px] xs:h-[35px] lg:h-[55px] relative">
                                <div className="xs:w-[10px] lg:w-[15px] h-[2px] xs:top-[20px] lg:top-[30px] xs:left-[14px] lg:left-[21px] bg-white absolute -rotate-45"></div>
                                <div className="xs:w-[10px] lg:w-[15px] h-[2px] xs:top-[13.5px] lg:top-[21px] xs:left-[14px] lg:left-[21px] bg-white absolute -rotate-[135deg]"></div>
                            </div>
                        </div>}
                </div>
                <div className="relative mr-auto ml-auto w-full flex flex-col xs:pb-[420px] lg:pb-[540px] p-[20px] min-w-[300px] max-w-[300px] rounded-[20px] shadow-[0px_1px_10px_0px_rgb(108,149,158)] bg-white bg-opacity-10">
                    <h2 className="py-[27px] bg-[rgb(81,41,130)] bg-opacity-90 lg:rounded-[20px] text-center font-poppins xs:text-[20px] lg:text-[30px] font-[600] xs:leading-[30px] lg:leading-[45px] text-white">Order list</h2>
                    {
                        cart.map((dishe:IDishe,i) => (
                            <div key={i} className="mt-[30px] flex w-full gap-[5px]
                            ">
                                <img className="xs:inline lg:hidden w-[100px] h-[100px]" src={dishe.img} alt="" />
                                <div className="flex flex-col w-full ">
                                    <div className="xs:mt-[10px] lg:mt-[0px] w-full flex items-center justify-between">
                                        <p className="text-center font-poppins xs:text-[14px] lg:text-[25px] font-[600] xs:leading-[30px] lg:leading-[200%] text-black">{dishe.name}</p>
                                        <img onClick={() => dispatch(removeFromCart(dishe.id))} className="cursor-pointer w-[24px] h-[24px]" src="./img/order/remove.svg" alt="" />
                                    </div>
                                    <div className="xs:mt-[30px] lg:mt-[10px] flex items-center w-full justify-between">
                                        <div className="flex items-center xs:gap-[10px] lg:gap-[20px] bg-[rgb(250,250,249)] rounded-full">
                                            <img onClick={() => dishe.quantity!==1&&dispatch(changeQuantity({oper:'minus',id:dishe.id}))} className="cursor-pointer rounded-full bg-white p-[8px] w-[35px] h-[35px]" src="./img/order/minus.svg" alt="" />
                                            <p className="text-center font-poppins xs:text-[13px] lg:text-[16px] font-[400] xs:leading-[19px] lg:leading-[25px] text-black">{dishe.quantity}</p>
                                            <img onClick={() => dispatch(changeQuantity({oper:'plus',id:dishe.id}))} className="cursor-pointer rounded-full bg-white p-[8px] w-[35px] h-[35px]" src="./img/order/plus.svg" alt="" />
                                        </div>
                                        <p className="text-center font-poppins xs:text-[14px] lg:text-[25px] font-[500] xs:leading-[30px] lg:leading-[200%] text-[rgb(255,138,0)]">${(dishe.price * (dishe.quantity ?? 1)).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="p-[25px] border-dashed border-l-0 border-r-0 border-[rgb(208,204,199)] border-[1px] w-full absolute xs:bottom-[260px] lg:bottom-[360px] left-0">
                        <h2 className="font-poppins xs:text-[14px] lg:text-[25px] font-[600] xs:leading-[21px] lg:leading-[38px] text-black">Voucher Code</h2>
                        <div className="flex gap-[20px] mt-[20px]">
                            <input className="w-full rounded-[15px] bg-[rgb(250,250,249)] p-[15px] outline-none
                            font-poppins xs:text-[14px] lg:text-[20px] font-[400] xs:leading-[21px] lg:leading-[30px] text-[rgb(8,117,196)]
                            " type="text" onChange={(e) => setVoucherCode(e.target.value)} value={voucherCode.toUpperCase()}/>
                            <button onClick={checkVoucherCode}
                            className="w-full xs:min-w-[50px] lg:min-w-[60px] rounded-[15px] bg-[rgb(83,165,224)] xs:w-[50px] lg:w-[60px] xs:h-[50px] lg:h-[60px]
                            flex items-center justify-center">
                                <img className="w-[25px] h-[25px]" src="./img/order/plus_white.svg" alt="" />
                            </button>
                        </div>
                    </div>
                    <div className="absolute bottom-[20px] left-0 w-full px-[25px] xs: lg:mt-[180px] flex flex-col">
                        <div className="xs:mt-[10px] lg:mt-[15px] flex justify-between items-center">
                            <p className="font-poppins xs:text-[14px] lg:text-[25px] font-[600] xs:leading-[21px] lg:leading-[38px] text-black">Subtotal</p>
                            <p className="font-poppins xs:text-[14px] lg:text-[25px] font-[500] lg:leading-[200%] text-colorO">${subTotalValue.toFixed(2)}</p>
                        </div>
                        <div className="xs:mt-[10px] lg:mt-[15px] flex justify-between items-center">
                            <p className="font-poppins xs:text-[14px] lg:text-[25px] font-[600] xs:leading-[21px] lg:leading-[38px] text-black">Tax fee</p>
                            <p className="font-poppins xs:text-[14px] lg:text-[25px] font-[500] lg:leading-[200%] text-colorO">${taxValue.toFixed(1)}</p>
                        </div>
                        <div className="xs:mt-[10px] lg:mt-[15px] flex justify-between items-center">
                            <p className="font-poppins xs:text-[14px] lg:text-[25px] font-[600] xs:leading-[21px] lg:leading-[38px] text-black">Voucher</p>
                            <p className="font-poppins xs:text-[14px] lg:text-[25px] font-[500] lg:leading-[200%] text-colorO">${voucherValue.toFixed(1)}</p>
                        </div>
                        <div className="xs:mt-[25px] lg:mt-[15px] xs:mb-[30px] lg:mb-[20px] flex justify-between items-center">
                            <p className="font-poppins xs:text-[20px] lg:text-[25px] font-[600] xs:leading-[30px] lg:leading-[38px] text-black">Total</p>
                            <p className="font-poppins xs:text-[20px] lg:text-[25px] font-[600] lg:leading-[200%] text-colorO">${(subTotalValue+taxValue-voucherValue).toFixed(2)}</p>
                        </div>
                        <button onClick={toCheckout}
                            className="w-full font-poppins rounded-[15px] bg-[rgb(63,198,110)] xs:py-[9px] lg:py-[5px] 
                            xs:px-[62px] lg:px-[80px]  xs:text-[16px] lg:text-[25px] font-[600] leading-[200%]
                            flex items-center justify-center text-white">Checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderCatalog