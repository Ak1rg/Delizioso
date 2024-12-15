import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/store"
import { useNavigate } from "react-router-dom"
import { IOrder, ITable } from "../types/user"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import OrderCom from "../components/profile/OrderCom"
import { getUser, removeUser } from "../store/reducers/userReduce"


const Profile = () => {

    const userData = useAppSelector(s => s.user)
    const routes = useAppSelector(s => s.app.routes)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const [showTables, setshowTables] = useState<boolean>(true)
    const [showOrders, setshowOrders] = useState<boolean>(true)

    const getData = async () => {
        try {
            dispatch(getUser(String(userData.uid)));
        } catch (error){
            console.error(error)
        } 
    }
    const logout = () => {
        dispatch(removeUser())
        navigate(routes.home)
    }

    useEffect(() => {
        if (
            !userData.fullName &&
            !userData.email &&
            userData.books.length === 0 && 
            !userData.date &&
            !userData.uid
        ) {
            navigate(routes.signup);
        } else {
            setIsLoading(false)
        }
    },[userData, navigate,routes.signup])

    if (isLoading) {
        return null; 
    }

    const deleteReservation = async (id:number) => {
        try {
            const docRef = doc(db,'users',`${userData.uid}`)
            const res = await getDoc(docRef);
            const books = res.data()?.books
            const updatedBooks = books.filter((e:ITable) => e.id !== id)
            await updateDoc(docRef,{
                books:updatedBooks
            })
            getData()
        } catch (error){
            console.error(error)
        } 
    }
    const deleteOrder = async (id:number) => {
        try {
            const docRef = doc(db,'users',`${userData.uid}`)
            const res = await getDoc(docRef);
            const books = res.data()?.orders
            const updatedOrders = books.filter((e:IOrder) => e.id !== id)
            await updateDoc(docRef,{
                orders:updatedOrders
            })
            getData()
        } catch (error){
            console.error(error)
        }
    }

    return (
        <>
            <section className="ml-auto mr-auto mt-[100px] max-w-[1170px] w-full px-[25px] flex flex-col items-center">
                <div className="flex xs:flex-col lg:flex-row xs:gap-[10px] lg:gap-[50px] items-center">
                    <img className="w-[120px] h-[120px] rounded-full" src="./img/profile/profile.png" alt="" />
                    <h1 className="font-tinos text-center xs:text-[35px] lg:text-[60px] xs:leading-[115%] lg:leading-[88px] font-[700] text-colorBd">
                        {userData.fullName}
                    </h1>
                </div>
                <div className="mt-[50px] flex xs:flex-col lg:flex-row xs:gap-[10px] lg:gap-[50px]">
                    <p className="font-poppins xs:text-[12px] lg:text-[20px] font-[400] text-colorBd leading-[200%]">Email: {userData.email}</p>
                    <p className="font-poppins xs:text-[12px] lg:text-[20px] font-[400] text-colorBd leading-[200%]">Date registration: {userData.date}</p>
                    <button onClick={logout} className="font-poppins xs:text-[12px] lg:text-[20px] font-[400] text-[red] leading-[200%]">Log out</button>
                </div>
            </section>
            <section className="ml-auto mr-auto my-[100px] max-w-[1170px] w-full px-[25px] flex flex-col">
                <div className="flex items-center justify-center gap-[40px]">
                    <h2 className="font-tinos text-center xs:text-[35px] lg:text-[60px] xs:leading-[115%] lg:leading-[88px] font-[700] text-colorBd">Your Reservation</h2>
                    <img onClick={getData} className="cursor-pointer xs:w-[19px] xs:h-[19px] lg:w-[40px] lg:h-[40px]" src="./img/profile/refresh.svg" alt="" />
                </div>
                <div className={`mt-[30px] flex gap-[36px] flex-wrap justify-center ${userData.books.length >3&&showTables&&'xs:max-h-[150px] lg:max-h-[190px] overflow-hidden'}`}>
                    {userData.gettingData===false&&userData.books.map((table:ITable) => (
                        <div key={table.id} className="relative bg-[rgb(208,204,199)] bg-opacity-10 rounded-[20px] border-solid border-colorBd border-[1px] px-[20px] py-[10px]">
                            <h6 className="font-poppins xs:text-[14px] lg:text-[24px] font-[500] text-colorBd leading-[200%]">Reservation table: {table.id}</h6>
                            <p className="font-poppins xs:text-[12px] lg:text-[20px] font-[500] text-colorBd leading-[200%]">Time: {table.Time}</p>
                            <p className="font-poppins xs:text-[12px] lg:text-[20px] font-[500] text-colorBd leading-[200%]">Date: {table.Date}</p>
                            <p className="font-poppins xs:text-[12px] lg:text-[20px] font-[500] text-colorBd leading-[200%]">Group size: {table.PartySize}</p>
                            <p onClick={() => deleteReservation(table.id)} className="cursor-pointer absolute right-[25px] bottom-[10px] font-poppins xs:text-[12px] lg:text-[20px] font-[500] text-[#EA1010] leading-[200%]">Cancel</p>
                        </div>
                    ))}
                </div>
                {userData.books.length > 3 && <h6 onClick={() => setshowTables(e=>!e)} className="mt-[10px] cursor-pointer text-right font-poppins xs:text-[14px] lg:text-[24px] font-[500] text-colorBd leading-[200%]">Show {showTables?'all':'less'}</h6>}
                {userData.books.length==0&&userData.gettingData===false&&<h3 className="font-tinos text-center xs:text-[25px] lg:text-[40px] xs:leading-[115%] lg:leading-[88px] font-[700] text-colorBd">You don't have reservation</h3>}
                {userData.gettingData&&<img className="my-[80px] ml-auto mr-auto xs:w-[50px] xs:h-[50px] lg:w-[100px] lg:h-[100px] animate-spin" src="./img/profile/refresh.svg" alt="" />}
            </section>
            <section className="ml-auto mr-auto my-[100px] max-w-[1170px] w-full px-[25px] flex flex-col">
                <div className="flex items-center justify-center gap-[40px]">
                    <h2 className="font-tinos text-center xs:text-[35px] lg:text-[60px] xs:leading-[115%] lg:leading-[88px] font-[700] text-colorBd">Your Orders</h2>
                    <img onClick={getData} className="cursor-pointer xs:w-[19px] xs:h-[19px] lg:w-[40px] lg:h-[40px]" src="./img/profile/refresh.svg" alt="" />
                </div>
                <div className={`mt-[30px] flex gap-[36px] flex-wrap justify-center ${userData.orders.length >3&&showOrders&&'xs:max-h-[150px] lg:max-h-[190px] overflow-hidden'}`}>
                    {userData.gettingData===false&&userData.orders.map((order:IOrder) => (
                        <OrderCom key={order.id} delete={deleteOrder} order={order}/>
                    ))}
                </div>
                {userData.orders.length > 3 && <h6 onClick={() => setshowOrders(e=>!e)} className="mt-[10px] cursor-pointer text-right font-poppins xs:text-[14px] lg:text-[24px] font-[500] text-colorBd leading-[200%]">Show {showOrders?'all':'less'}</h6>}
                {userData.orders.length==0&&userData.gettingData===false&&<h3 className="font-tinos text-center xs:text-[25px] lg:text-[40px] xs:leading-[115%] lg:leading-[88px] font-[700] text-colorBd">You don't have orders</h3>}
                {userData.gettingData&&<img className="my-[80px] ml-auto mr-auto xs:w-[50px] xs:h-[50px] lg:w-[100px] lg:h-[100px] animate-spin" src="./img/profile/refresh.svg" alt="" />}
            </section>
        </>
    )
}

export default Profile