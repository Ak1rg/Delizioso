import { useEffect, useState } from "react"
import { useAppSelector } from "../store/store"
import { useNavigate } from "react-router-dom"
import { ITable } from "../types/user"


const Profile = () => {

    const userData = useAppSelector(s => s.user)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [showTables, setshowTables] = useState<boolean>(true)
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
    }, [userData, navigate]);

    if (isLoading) {
        return null; 
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
                <div className={`flex gap-[36px] flex-wrap justify-center ${userData.books.length >3&&showTables&&'xs:max-h-[150px] lg:max-h-[190px] overflow-hidden'}`}>
                    {userData.books.map((table:ITable) => (
                        <div key={table.id} className="bg-[rgb(208,204,199)] bg-opacity-10 rounded-[20px] border-solid border-colorBd border-[1px] px-[20px] py-[10px]">
                            <h6 className="font-poppins xs:text-[14px] lg:text-[24px] font-[500] text-colorBd leading-[200%]">Reservation table: {table.id}</h6>
                            <p className="font-poppins xs:text-[12px] lg:text-[20px] font-[500] text-colorBd leading-[200%]">Time: {table.Time}</p>
                            <p className="font-poppins xs:text-[12px] lg:text-[20px] font-[500] text-colorBd leading-[200%]">Date: {table.Date}</p>
                            <p className="font-poppins xs:text-[12px] lg:text-[20px] font-[500] text-colorBd leading-[200%]">Group size: {table.PartySize}</p>
                        </div>
                    ))}
                </div>
                {userData.books.length > 3 && <h6 onClick={() => setshowTables(e=>!e)} className="mt-[10px] cursor-pointer text-right font-poppins xs:text-[14px] lg:text-[24px] font-[500] text-colorBd leading-[200%]">Show {showTables?'all':'less'}</h6>}
                {userData.books.length==0&&<h3 className="font-tinos text-center xs:text-[25px] lg:text-[40px] xs:leading-[115%] lg:leading-[88px] font-[700] text-colorBd">You don't have reservation</h3>}
            </section>
        </>
    )
}

export default Profile