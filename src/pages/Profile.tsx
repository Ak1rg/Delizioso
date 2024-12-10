import { useEffect, useState } from "react"
import { useAppSelector } from "../store/store"
import { useNavigate } from "react-router-dom"
import { ITable } from "../types/user"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"


const Profile = () => {

    const userData = useAppSelector(s => s.user)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [showTables, setshowTables] = useState<boolean>(true)
    const [reservationArr, setReservationArr] = useState<ITable[]>(userData.books)
    const [gettingData, setGettingData] = useState<boolean>(false)

    const getReservation = async () => {
        setGettingData(true)
        setReservationArr([])
        try {
            const res = await getDoc(doc(db,'users',`${userData.uid}`));
            setReservationArr(res.data()?.books)
        } catch (error){
            console.error(error)
            setReservationArr([])
        } finally {
            setGettingData(false)
        }
    }

    useEffect(() => {
        if (
            !userData.fullName &&
            !userData.email &&
            userData.books.length === 0 && 
            !userData.date &&
            !userData.uid
        ) {
            navigate('/signup');
        } else {
            setIsLoading(false)
        }
    },[userData, navigate])

    if (isLoading) {
        return null; 
    }

    const deleteReservation = async (id:number) => {
        setGettingData(true)
        setReservationArr([])
        try {
            const docRef = doc(db,'users',`${userData.uid}`)
            const res = await getDoc(docRef);
            const books = res.data()?.books
            const updatedBooks = books.filter((e:ITable) => e.id !== id)
            await updateDoc(docRef,{
                books:updatedBooks
            })
            setReservationArr(updatedBooks)
        } catch (error){
            console.error(error)
            setReservationArr([])
        } finally {
            setGettingData(false)
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
                </div>
            </section>
            <section className="ml-auto mr-auto my-[100px] max-w-[1170px] w-full px-[25px] flex flex-col">
                <div className="flex items-center justify-center gap-[40px]">
                    <h2 className="font-tinos text-center xs:text-[35px] lg:text-[60px] xs:leading-[115%] lg:leading-[88px] font-[700] text-colorBd">Your Reservation</h2>
                    <img onClick={getReservation} className="cursor-pointer xs:w-[19px] xs:h-[19px] lg:w-[40px] lg:h-[40px]" src="./img/profile/refresh.svg" alt="" />
                </div>
                <div className={`mt-[30px] flex gap-[36px] flex-wrap justify-center ${userData.books.length >3&&showTables&&'xs:max-h-[150px] lg:max-h-[190px] overflow-hidden'}`}>
                    {reservationArr.map((table:ITable) => (
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
                {userData.books.length==0&&gettingData===false&&<h3 className="font-tinos text-center xs:text-[25px] lg:text-[40px] xs:leading-[115%] lg:leading-[88px] font-[700] text-colorBd">You don't have reservation</h3>}
                {gettingData&&<img className="my-[80px] ml-auto mr-auto xs:w-[50px] xs:h-[50px] lg:w-[100px] lg:h-[100px] animate-spin" src="./img/profile/refresh.svg" alt="" />}
            </section>
        </>
    )
}

export default Profile