import { Link } from "react-router-dom"
import Catalog from "../components/catalog/Catalog"
import Button from "../components/button/button"
import SwiperComponent from "../components/swiper/swiper"

const Home = () => {
    return (
        <>
            <section className="ml-auto mr-auto mt-[150px] max-w-[1170px] w-full px-[25px] flex xs:flex-col xl:flex-row">
                <div className="max-w-[523px] w-full flex flex-col md:mx-[80px] xl:mx-px">
                    <button className="
                    xs:max-w-[93px] lg:max-w-[163px] rounded-[126px] cursor-auto xs:px-[20px] lg:px-[35px] xs:py-[6px] lg:py-[10px]
                    bg-[rgba(255,138,0,0.2)] text-[#FF8A00] font-raleway xs:text-[12px] lg:text-[18px]
                    font-[400] leading-[13px]
                    ">Restaraun</button>
                    <h2 className="
                    mt-[20px] max-w-[280px] font-raleway xs:text-[60px] lg:text-[80px] 
                    font-[700] xs:leading-[60px] lg:leading-[88px] text-[#311F09]
                    ">Italian Cuisine</h2>
                    <p className="
                    mt-[30px] max-w-[523px] font-poppins xs:text-[12px] lg:text-[20px] font-[400]
                    xs:leading-[24px] lg:leading-[40px] text-[#5C4529]
                    ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales senectus dictum arcu sit tristique donec eget.</p>
                    <div className="mt-[30px] flex gap-[20px] xs:mx-auto xl:mx-px">
                        <button className="block rounded-[160px] border-[colorB] bg-colorO xs:py-[8px] lg:py-[17px] xs:px-[34px] lg:px-[40px] xs:text-[12px] lg:text-[20px] font-[600] font-poppins xs:leading-[24px] lg:leading-[40px] text-white ">Order now</button>
                        <button className="block rounded-[160px] border-[colorB] bg-[#3FA72F] xs:py-[8px] lg:py-[17px] xs:px-[34px] lg:px-[40px] xs:text-[12px] lg:text-[20px] font-[600] font-poppins xs:leading-[24px] lg:leading-[40px] text-white">Reservation</button>
                    </div>
                </div>
                <img src="./img/home/preview_pasta.png" className="xs:mt-[100px] xl:mt-[30px] max-w-[600px] w-full xs:mx-auto xl:mx-px" alt="preview pasta homepage "/>
            </section>
            <section className="mt-[150px] px-[25px] bg-[#3FC66E] bg-opacity-10">
                <div className="ml-auto mr-auto max-w-[1170px] py-[45px] flex xl:justify-between xs:flex-col-reverse xl:flex-row">
                    <img src="./img/home/main_salad.png" alt="main salad picture" className="max-w-[600px] w-full xs:mx-auto xl:mx-px" />
                    <div className="flex flex-col max-w-[434px] w-full md:mx-[80px] xl:mx-px">
                        <h1 className="mt-[45px] font-tinos xs:text-[35px] lg:text-[80px] xs:leading-[115%] lg:leading-[88px] font-[700]">
                            <span className="block text-colorB">Welcome to</span>
                            <span className="block text-colorO">delizioso</span>
                        </h1>
                        <p className="mt-[30px] font-poppins xs:text-[12px] lg:text-[20px] font-[400] text-colorB align-left leading-[200%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis ultricies at eleifend proin. Congue nibh nulla malesuada ultricies nec quam</p>
                        <Link to='/menu'><button className="mt-[30px] rounded-[160px] border-[colorB] bg-colorO xs:py-[13px] lg:py-[17px] xs:px-[34px] lg:px-[45px] xs:text-[14px] lg:text-[20px] font-[400] font-poppins xs:leading-[180%] lg:leading-[40px] text-white ">See our menu</button></Link>
                    </div>
                </div>
            </section>
            <section className="ml-auto mr-auto mt-[150px] max-w-[1170px] w-full px-[25px] flex flex-col">
                <h2 className="text-center font-tinos xs:text-[35px] lg:text-[80px] xs:leading-[115%] lg:leading-[200%] font-[700] text-colorBd">Our popular menu</h2>
                <Catalog/>
            </section>
            <section className="mt-[150px] w-full bg-[rgb(255,244,231,0.4)] overflow-hidden">
                <div className="ml-auto mr-auto max-w-[1170px] px-[25px] w-full relative flex xs:flex-col xl:flex-row xl:justify-end">
                    <div className="
                    absolute xs:top-[360px] lg:top-[600px] xl:top-[80px] xs:left-1/2 xs:-translate-x-[208px] xl:translate-x-0 xl:-left-[210px] flex items-center justify-center
                    border-solid border-[1px] border-[rgb(49,31,9,0.2)] rounded-[100%]
                    xs:w-[418px] xs:h-[418px] flex-1 xl:w-[883px] xl:h-[883px]
                    ">
                        <div className="border-solid xs:border-[35px] xl:border-[70px] border-[rgb(225,195,159,0.2)] rounded-[100%]">
                            <img className="xs:w-[253px] xs:h-[253px] xl:w-[526px] xl:h-[526px]" src="./img/home/table_food.png" alt="" />
                        </div>
                        <div className="border-solid xs:border-[10px] xl:border-[18px] border-[rgb(225,195,159,0.2)] rounded-[100%] absolute xs:-top-[10px] xs:right-[40px] xl:top-0 xl:right-[90px]">
                            <img className="xs:w-[69px] xs:h-[69px] xl:w-[143px] xl:h-[143px]" src="./img/home/table_dark.png" alt="" />
                        </div>
                        <div className="border-solid xs:border-[10px] xl:border-[18px] border-[rgb(225,195,159,0.2)] rounded-[100%] absolute xs:-bottom-[10px] xs:left-[40px] xl:bottom-0 xl:left-[80px]">
                            <img className="xs:w-[69px] xs:h-[69px] xl:w-[143px] xl:h-[143px]" src="./img/home/table_light.png" alt="" />
                        </div>
                    </div>
                    <div className="flex flex-col xl:my-[232px] xs:mt-[60px] xs:mb-[502px] lg:mb-[550px]">
                        <h2 className="max-w-[455px] font-tinos xs:text-[35px] lg:text-[76px] xs:leading-[100%] lg:leading-[110%] font-[700]">
                            <span className="block text-colorBd">Let's reserve</span>
                            <span className="block text-colorO">a table</span>
                        </h2>
                        <p className="
                        xs:mt-[32px] xl:mt-[50px] max-w-[433px] font-poppins xs:text-[12px] lg:text-[20px] font-[400]
                        xs:leading-[24px] lg:leading-[200%] text-[#5C4529]
                        ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis ultricies at eleifend proin. Congue nibh nulla malesuada ultricies nec quam </p>
                        <Link to='/'><button className="xs:mt-[40px] xl:mt-[130px] rounded-[160px] border-[colorB] bg-colorO xs:py-[13px] lg:py-[17px] xs:px-[41px] lg:px-[55px] xs:text-[14px] lg:text-[20px] font-[600] font-poppins xs:leading-[200%] lg:leading-[40px] text-white ">Resevation</button></Link>
                    </div>
                </div>  
            </section>
            <section className="ml-auto mr-auto mt-[150px] max-w-[1170px] w-full px-[25px] flex flex-col">
                <h2 className="text-center font-tinos xs:text-[35px] lg:text-[80px] xs:leading-[115%] lg:leading-[200%] font-[700] text-colorBd">Our greatest chef</h2>
                <div className="ml-auto mr-auto xs:mt-[50px] lg:mt-[135px] flex gap-[40px] flex-wrap justify-center xs:max-w-[400px] lg:max-w-[1100px]">
                    <div className="flex flex-col">
                        <div className="bg-[rgb(27,22,29,0.2)] xs:rounded-[30px] lg:rounded-[50px] xs:w-[157px] lg:w-[324px]">
                            <img src="./img/home/betran.png" alt="" />
                        </div>
                        <p className="xs:mt-[15px] lg:mt-[40px] text-center font-poppins xs:text-[14px] lg:text-[25px] xs:leading-[21px] lg:leading-[200%] font-[600] text-colorBd">Betran Komar</p>
                        <p className="xs:mt-[5px] lg:mt-[30px] text-center font-poppins xs:text-[14px] lg:text-[25px] xs:leading-[21px] lg:leading-[200%] font-[400] text-[rgb(160,141,118)]">Head chef</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="bg-[rgb(255,138,0,0.2)] xs:rounded-[30px] lg:rounded-[50px] xs:w-[157px] lg:w-[324px]">
                            <img src="./img/home/ferry.png" alt="" />
                        </div>
                        <p className="xs:mt-[15px] lg:mt-[40px] text-center font-poppins xs:text-[14px] lg:text-[25px] xs:leading-[21px] lg:leading-[200%] font-[600] text-colorBd">Ferry Sauwi</p>
                        <p className="xs:mt-[5px] lg:mt-[30px] text-center font-poppins xs:text-[14px] lg:text-[25px] xs:leading-[21px] lg:leading-[200%] font-[400] text-[rgb(160,141,118)]">Chef</p>
                    </div>
                    <div className="xs:flex lg:hidden flex-col">
                        <div className="bg-[rgb(255,138,0,0.2)] xs:rounded-[30px] lg:rounded-[50px] xs:w-[157px] lg:w-[324px]">
                            <img src="./img/home/ferry.png" alt="" />
                        </div>
                        <p className="xs:mt-[15px] lg:mt-[40px] text-center font-poppins xs:text-[14px] lg:text-[25px] xs:leading-[21px] lg:leading-[200%] font-[600] text-colorBd">Ferry Sauwi</p>
                        <p className="xs:mt-[5px] lg:mt-[30px] text-center font-poppins xs:text-[14px] lg:text-[25px] xs:leading-[21px] lg:leading-[200%] font-[400] text-[rgb(160,141,118)]">Chef</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="bg-[rgb(157,101,66,0.2)] xs:rounded-[30px] lg:rounded-[50px] xs:w-[157px] lg:w-[324px]">
                            <img src="./img/home/iswan.png" alt="" />
                        </div>
                        <p className="xs:mt-[15px] lg:mt-[40px] text-center font-poppins xs:text-[14px] lg:text-[25px] xs:leading-[21px] lg:leading-[200%] font-[600] text-colorBd">Iswan Dracho</p>
                        <p className="xs:mt-[5px] lg:mt-[30px] text-center font-poppins xs:text-[14px] lg:text-[25px] xs:leading-[21px] lg:leading-[200%] font-[400] text-[rgb(160,141,118)]">Chef</p>
                    </div>
                </div>
                <Button 
                    color="#FF8A00" 
                    px={78} 
                    px2={78} 
                    py={17}
                    py2={17} 
                    r={162} 
                    t={20} 
                    t2={20} 
                    f={600} 
                    l="200%" 
                    c="xs:hidden lg:block lg:mt-[150px] ml-auto mr-auto " 
                    text="View all" 
                />
            </section> 
            <section className="mt-[150px] w-full px-[25px] py-[100px]">
                <SwiperComponent/>
            </section>
            <section className="ml-auto mr-auto my-[150px] max-w-[1170px] w-full px-[25px] flex flex-col">
                <div className="relative">
                    <img src="./img/home/footer_background.png" className="w-full min-h-[416px] h-416px absolute left-0 top-0 z-0" alt="" />
                    <div className="flex flex-col z-[1] relative items-center">
                        <h2 className="text-center font-tinos xs:mt-[30px] lg:mt-0 xs:max-w-[185px] lg:max-w-[600px] xs:text-[40px] lg:text-[80px] xs:leading-[115%] lg:leading-[200%] font-[700] text-white">we are open from</h2>
                        <p className="xs:mt-[30px] lg:mt-0 text-center font-poppins xs:text-[16px] lg:text-[40px] xs:leading-[24px] lg:leading-[200%] font-[600] text-white">Monday-Sunday</p>
                        <div className="xs:mt-[10px] lg:mt-0 xl:mt-[20px]">
                            <p className=" text-center font-poppins xs:text-[12px] lg:text-[20px] xs:leading-[18px] lg:leading-[200%] font-[400] text-white">Launch : Mon-Sun : 11:00am-02:00pm</p>
                            <p className=" text-center font-poppins xs:text-[12px] lg:text-[20px] xs:leading-[18px] lg:leading-[200%] font-[400] text-white">Dinner : sunday : 04:00pm-08:00pm</p>
                        </div>
                        <div className="flex xs:flex-col lg:flex-row gap-[20px]  items-center justify-center xs:mt-[20px] lg:mt-[10px] xl:mt-[90px] lg:bm-[110px] xl:mb-[70px]">
                            <button className='xs:rounded-[45px] lg:rounded-[162px] xs:max-w-[168px] lg:max-w-[234px] xs:px-[31px] lg:px-[62px] xs:py-[11px] 
                            lg:py-[17px] xs:text-[20px] lg:text-[20px] font-[600] 
                            font-poppins leading-[200%] text-white bg-[#FF8A00] cursor-pointer'>Order now</button>
                            <button className='xs:rounded-[45px] lg:rounded-[162px] xs:max-w-[168px] lg:max-w-[234px] xs:px-[24px] lg:px-[62px] xs:py-[11px] 
                            lg:py-[17px] xs:text-[20px] lg:text-[20px] font-[600] 
                            font-poppins leading-[200%] text-colorBd bg-[rgba(255,255,255,0.95)] cursor-pointer'>Reservation</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home