import { Link } from "react-router-dom"
import { useAppSelector } from "../../store/store"

const Footer = () => {

    const routes = useAppSelector(s => s.app.routes)

    const cols = [
        {
            title:'Information',
            words:['About us','Testimonial','Event']
        },
        {
            title:'Get in touch',
            words:['3247 Johnson Ave, Bronx, NY 10463, Amerika Serikat','delizioso@gmail.com','+123 4567 8901',]
        },
    ]

    return (
        <footer className={`relative ml-auto mr-auto mt-13 mb-0 flex justify-center align-center pt-[120px] pb-[75px] bg-[rgb(49,31,9)] z-[10]`}>
            <div className={` flex justify-between w-full max-w-[1170px] px-[25px] flex-wrap `}>
                <div className='flex flex-col xs:gap-[30px] md:gap-[0px] justify-between xs:w-[100%] md:w-1/2 xl:w-auto xs:mt-[30px] pr-[40px]'>
                    <img className='w-[132px]' src="./img/footer/footer_logo.png" alt="" />
                    <p className={'xs:text-[14px] md:text-[20px] font-poppins weight-normal text-[#E3E2E0] md:max-w-[352px] leading-[40px]'}>Viverra gravida morbi egestas facilisis tortor netus non duis tempor. </p>
                    <div className={'flex gap-[30px]'}>
                        <img src="./img/footer/twitter.svg" alt="" />
                        <img src="./img/footer/instagram.svg" alt="" />
                        <img src="./img/footer/facebook.svg" alt="" />
                    </div>
                </div>
                <div className='flex flex-col gap-[25px] xs:w-[100%] md:w-1/2 xl:w-auto xs:mt-[30px]'>
                    <h3 className='text-[#FF8A00] xs:text-[18px] md:text-[25px] leading-[50px] font-poppins font-[600]'>Pages</h3>
                    <div className='flex flex-col gap-[15px]'>
                        <Link to={routes.home}><h4 className='text-[#E3E2E0] xs:text-[14px] md:text-[20px] leading-[30px] font-[400] max-w-[280px] cursor-pointer'>Home</h4></Link>
                        <Link to={routes.menu}><h4 className='text-[#E3E2E0] xs:text-[14px] md:text-[20px] leading-[30px] font-[400] max-w-[280px] cursor-pointer'>Menu</h4></Link>
                        <Link to={routes.order}><h4 className='text-[#E3E2E0] xs:text-[14px] md:text-[20px] leading-[30px] font-[400] max-w-[280px] cursor-pointer'>Order Online</h4></Link>
                        <Link to={routes.about}><h4 className='text-[#E3E2E0] xs:text-[14px] md:text-[20px] leading-[30px] font-[400] max-w-[280px] cursor-pointer'>Catering</h4></Link>
                        <Link to={routes.reservation}><h4 className='text-[#E3E2E0] xs:text-[14px] md:text-[20px] leading-[30px] font-[400] max-w-[280px] cursor-pointer'>Reservation</h4></Link>
                    </div>
                </div>
                {
                    cols.map((e:{title:string,words:string[]}) => (
                        <div className='flex flex-col gap-[25px] xs:w-[100%] md:w-1/2 xl:w-auto xs:mt-[30px] ' key={e.title}>
                            <h3 className='text-[#FF8A00] xs:text-[18px] md:text-[25px] leading-[50px] font-poppins font-[600]'>{e.title}</h3>
                            <div className='flex flex-col gap-[15px]'>
                                {e.words.map((word, index) => (
                                    <h4 key={index} className='text-[#E3E2E0] xs:text-[14px] md:text-[20px] leading-[30px] font-[400] max-w-[280px] cursor-pointer'>{word}</h4>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </footer>
    )
}

export default Footer
