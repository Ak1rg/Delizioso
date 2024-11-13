import { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './swiper.scss';
import { useEffect, useRef, useState } from 'react';

const SwiperComponent = () => {
    const arr = [1,2,3,4,5,6,7];
    const reviews = [
    {
        name: "Starla Virgoun",
        position: "Financial Advisor",
        review: "Starla provides practical advice that really helped me organize my finances. Highly recommended!"
    },
    {
        name: "Liam Chen",
        position: "Investment Strategist",
        review: "Liam’s insights have been crucial for my portfolio growth. Great strategies and communication!"
    },
    {
        name: "Amelia Ruiz",
        position: "Retirement Planner",
        review: "Amelia's retirement planning advice has been a game-changer. I'm very thankful for her expertise!"
    },
    {
        name: "Noah Williams",
        position: "Wealth Manager",
        review: "Noah's wealth management skills are exceptional. Trustworthy and always gives clear advice."
    },
    {
        name: "Ava Johnson",
        position: "Tax Consultant",
        review: "Ava’s tax advice saved me a lot last year! She understands complex rules and explains them well."
    },
    {
        name: "Ethan White",
        position: "Risk Analyst",
        review: "Ethan is thorough with risk assessments. I feel secure knowing my investments are well-protected."
    },
    {
        name: "Sophia Clark",
        position: "Estate Planner",
        review: "Sophia handled my estate planning with care. Her attention to detail made all the difference."
    }
    ];
    const swiperRef = useRef<SwiperClass | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.on('slideChange', () => {
                setCurrentIndex(swiperRef.current?.realIndex ?? 0);
            });
        }
    }, []);

    const getDistanceNum = (index: number) => {
        return Math.min(
            Math.abs(index - currentIndex),
            arr.length - Math.abs(index - currentIndex)
        );
    };

    const changeSlide = (index: number) => {
        if (swiperRef.current) {
            const currentIndex = swiperRef.current.realIndex; 
            if (index === (currentIndex + 1) % arr.length) {
                swiperRef.current.slideNext();
            }
            else if (index === (currentIndex - 1 + arr.length) % arr.length) {
                swiperRef.current.slidePrev();
            }
        }
    };

    return (
        <>  
            <h2 className="text-center font-tinos xs:text-[35px] lg:text-[80px] xs:leading-[115%] lg:leading-[200%] font-[700] text-colorBd">Our customers say</h2>
            <img className={`ml-auto mr-auto rounded-[100%] xs:w-[120px] lg:w-[261px] xs:h-[120px] lg:h-[261px] xs:mt-[80px] lg:mt-[50px]`} src={`./img/home/human${currentIndex+1}.png`} alt="" />
            <div className='ml-auto mr-auto xs:mt-[20px] lg:mt-[40px] flex flex-col text-center'>
                <p className='font-poppins xs:text-[16px] lg:text-[30px] leading-[200%] font-[600] text-colorBd'>{reviews[currentIndex].name}</p>
                <p className='font-poppins xs:text-[12px] lg:text-[20px] leading-[200%] font-[400] text-colorB'>{reviews[currentIndex].position}</p>
            </div>
            <p className='ml-auto mr-auto xs:mt-[70px] lg:mt-[90px] text-center max-w-[524px] font-poppins xs:text-[12px] lg:text-[20px] leading-[200%] font-[400] text-colorB'>{reviews[currentIndex].review}</p>
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setCurrentIndex(swiper.realIndex);
                }}
                slidesPerView={5}
                spaceBetween={5}
                centeredSlides={true}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper lg:max-w-[1000px] lg:h-[300px] "
                allowTouchMove={false}
            >
                {arr.map((e) => (
                    <SwiperSlide 
                        key={e} 
                        onClick={() => changeSlide(e-1)}
                        className={`distance-${getDistanceNum(e-1)} cursor-pointer`}
                    >
                        <div className='layout-swiper'>
                            <img className={`distance-${getDistanceNum(e-1)}`} src={`./img/home/human${e}.png`} alt="" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default SwiperComponent;
