import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import {  useAppSelector } from "../../store/store"
import styles from './catalog.module.css'
import { IDishe } from "../../types/dishes"
import { useNavigate } from "react-router-dom"
import { db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"
import { addToCart } from "../../store/reducers/orderReduce"

const Catalog = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const ctgrs = useAppSelector(s => s.dishes.ctgrs)
    const routes = useAppSelector(s => s.app.routes)

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
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [filteredDishes, setFilteredDishes] = useState<IDishe[]>(dishes)
    const [pages, setPages] = useState<number>(1)

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
        navigate(routes.order);
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
            <div className={`${styles.catalog} mr-auto ml-auto xs:mt-[30px] lg:mt-[60px] flex xs:gap-[15px] lg:gap-[40px] flex-wrap`} 
            >
                {
                    !isLoading&&filteredDishes.slice(currentPage*6-6,currentPage*6).map((e:IDishe) => (
                        <div key={e.id} className=" xs:max-w-[155px] lg:max-w-[330px] flex flex-col items-center bg-[rgb(208,204,199,0.1)] xs:rounded-[18px] lg:rounded-[70px] xs:px-[13px] xs:py-[10px] lg:p-[30px]">
                            <img src={e.img} className="w-full xs:h-[130px] lg:h-[270px]" alt="" />
                            <p className="xs:mt-[10px] lg:mt-[24px] text-center font-poppins xs:text-[14px] lg:text-[30px] xs:leading-[21px] lg:leading-[200%] font-[600] text-colorBd">{e.name}</p>
                            <div className="mt-[5px] flex gap-[10px]">
                                {
                                    Array(5).fill(null).map((_,i) => (
                                        <svg key={i} className="xs:w-[9px] lg:w-[20px] xs:h-[9px] lg:h-[20px]" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className="fill-[#FF8A00]" d="M6.7186 1.23748C7.2467 -0.387848 9.54611 -0.387847 10.0742 1.23748L10.7729 3.38771C11.009 4.11458 11.6864 4.60671 12.4507 4.60671H14.7115C16.4205 4.60671 17.1311 6.79357 15.7485 7.79808L13.9194 9.127C13.3011 9.57623 13.0424 10.3725 13.2785 11.0994L13.9772 13.2496C14.5053 14.8749 12.645 16.2265 11.2624 15.222L9.43334 13.8931C8.81503 13.4438 7.97778 13.4438 7.35946 13.8931L5.53037 15.222C4.14778 16.2265 2.28752 14.8749 2.81562 13.2496L3.51428 11.0994C3.75045 10.3725 3.49172 9.57623 2.87341 9.127L1.04432 7.79808C-0.33827 6.79357 0.372286 4.60671 2.08126 4.60671H4.34214C5.10642 4.60671 5.78377 4.11458 6.01995 3.38771L6.7186 1.23748Z" fill="white"/>
                                        </svg>
                                    ))
                                }
                            </div>
                            <p className="xs:mt-[12px] lg:mt-[15px] max-w-[283px] line-clamp-2 lg:line-clamp-none w-full overflow-hidden xs:text-ellipsis text-center font-poppins xs:text-[12px] lg:text-[14px] xs:leading-[120%] lg:leading-[200%] font-[400] text-[#59442B]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas consequat mi eget auctor aliquam, diam. </p>
                            <div className="xs:mt-[14px] lg:mt-[30px] max-w-[283px] flex justify-between w-full items-center">
                                <p className="font-poppins xs:text-[16px] lg:text-[25px] xs:leading-[24px] lg:leading-[38px] font-[600] xs:text-colorO lg:text-colorBd">${e.price.toFixed(2)}</p>
                                <button onClick={() => addCart(e)} className="xs:hidden lg:block rounded-[160px]  bg-colorO  py-[11px] px-[35px] text-[16px] font-[600] font-poppins lg:leading-[200%] text-white ">Order now</button>
                                <button onClick={() => addCart(e)} className="xs:block lg:hidden w-[34px] h-[34px] rounded-[100%] flex items-center justify-center bg-colorO">
                                    <div className="flex flex-col items-center justify-center relative">
                                        <div className="bg-white w-[12px] h-[1.5px] rounded-[50px] absolute"></div>
                                        <div className="bg-white w-[11px] h-[1.5px] rounded-[50px] absolute rotate-90 left-[11.5px]"></div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    ))
                }
                {isLoading&&<img className="my-[80px] ml-auto mr-auto xs:w-[50px] xs:h-[50px] lg:w-[100px] lg:h-[100px] animate-spin" src="./img/profile/refresh.svg" alt="" />}
            </div>
            <div className="mr-auto ml-auto xs:mt-[25px] lg:mt-[88px] flex gap-[15px] max-w-[350px]">
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
            </div>
        </>
    )
}

export default Catalog