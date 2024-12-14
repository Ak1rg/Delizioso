import { FC, useState } from 'react'
import { IOrder } from '../../types/user'


interface IProps {
    order:IOrder
    delete:(id:number) => void
}

const OrderCom:FC<IProps> = ({order,delete:onDelete}) => {

    const [showAll, setshowAll] = useState<boolean>(false)

    return (
        <div className={`relative ${!showAll&&'xs:max-h-[100px] lg:max-h-[150px] overflow-hidden'} bg-[rgb(208,204,199)] bg-opacity-10 rounded-[20px] border-solid border-colorBd border-[1px] px-[20px] py-[10px]`}>
            <div className="flex xs:flex-col lg:flex-row gap-[20px]">
                <div className="flex flex-col xs:w-full lg:w-[30%] lg:min-w-[270px]">
                    <h6 className="font-poppins xs:text-[14px] lg:text-[24px] font-[500] text-colorBd leading-[200%]">Order id: {order.id}</h6>
                    <p className="font-poppins xs:text-[12px] lg:text-[20px] font-[500] text-colorBd leading-[200%]">Email: {order.email}</p>
                    <p className="font-poppins xs:text-[12px] lg:text-[20px] font-[500] text-colorBd leading-[200%]">Order method: {order.orderMethod}</p>
                </div>
                <p className={`xs:w-full lg:w-[70%] ${!showAll&&'max-h-[115px] overflow-hidden'} font-poppins xs:text-[12px] lg:text-[20px] font-[500] text-colorBd leading-[150%]`}>Note: {order.note}</p>
                <button className='absolute bottom-[5px] right-[10px]' onClick={() => setshowAll(e => !e)}>Show {showAll?'less':'all'}</button>
            </div>
            <div className='xs:mt-[20px] lg:mt-[50px] grid xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px]'>
                {order.dishes.map(dishe => (
                    <div key={dishe.id} className="ml-auto mr-auto max-h-[410px] xs:max-w-[155px] lg:max-w-[220px] flex flex-col items-center bg-[rgb(208,204,199,0.1)] xs:rounded-[18px] lg:rounded-[30px] xs:px-[13px] lg:px-[21px] xs:py-[12px] lg:py-[21px]">
                        <img src={dishe.img} className="w-full xs:w-[114px] lg:w-[175px] xs:h-[114px] lg:h-[175px]" alt="" />
                        <p className="text-center font-poppins xs:text-[14px] lg:text-[20px] xs:leading-[21px] lg:leading-[200%] font-[600] text-colorBd">{dishe.name}</p>
                        <div className="mt-[5px] flex gap-[10px]">
                            {
                                Array(5).fill(null).map((_,i) => (
                                    <svg key={i} className="xs:w-[9px] lg:w-[12px] xs:h-[9px] lg:h-[12px]" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path className="fill-[#FF8A00]" d="M6.7186 1.23748C7.2467 -0.387848 9.54611 -0.387847 10.0742 1.23748L10.7729 3.38771C11.009 4.11458 11.6864 4.60671 12.4507 4.60671H14.7115C16.4205 4.60671 17.1311 6.79357 15.7485 7.79808L13.9194 9.127C13.3011 9.57623 13.0424 10.3725 13.2785 11.0994L13.9772 13.2496C14.5053 14.8749 12.645 16.2265 11.2624 15.222L9.43334 13.8931C8.81503 13.4438 7.97778 13.4438 7.35946 13.8931L5.53037 15.222C4.14778 16.2265 2.28752 14.8749 2.81562 13.2496L3.51428 11.0994C3.75045 10.3725 3.49172 9.57623 2.87341 9.127L1.04432 7.79808C-0.33827 6.79357 0.372286 4.60671 2.08126 4.60671H4.34214C5.10642 4.60671 5.78377 4.11458 6.01995 3.38771L6.7186 1.23748Z" fill="white"/>
                                    </svg>
                                ))
                            }
                        </div>
                        <p className="xs:mt-[12px] lg:mt-[15px] xs:max-w-[150px] lg:max-w-[170px] line-clamp-2 lg:line-clamp-none w-full overflow-hidden xs:text-ellipsis text-center font-poppins xs:text-[12px] lg:text-[12px] xs:leading-[120%] lg:leading-[18px] font-[400] text-[#59442B]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas consequat.</p>
                    </div>
                ))}
            </div>
            <div className='w-full flex justify-center'>
                <button onClick={() => onDelete(order.id)} className="cursor-pointer mt-[10px] font-poppins xs:text-[12px] lg:text-[20px] font-[500] text-[#EA1010] leading-[200%]">Delete</button>
            </div>
        </div>
    )
}

export default OrderCom