import { useSelector } from "react-redux"
import { IState } from "../../store/store"

const Mail = () => {

    const mailState = useSelector((state:IState) => state.app.mailState)

    return (
        <div className={`${mailState==null?'invisible':'visible'} fixed right-[20px] bottom-[20px] xs:text-[16px] lg:text-[30px] bg-white z-[3] border-solid
            border-colorBd border-[1px] rounded-[10px] px-[10px] py-[5px]`}>
            {mailState === 'loading'? <div className="flex justify-center items-center">
                <div className="border-4 border-t-4 border-gray-300 border-solid rounded-full w-16 h-16 animate-spin border-t-colorO"></div>
            </div>:''}
            {mailState === 'success'? <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 24" className="w-16 h-16" style={{ fill: "#FF8A00" }}>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M20.285 5.708l-11.97 11.97a1 1 0 0 1-1.415 0l-5.708-5.708a1 1 0 0 1 1.415-1.415l5.063 5.062L18.87 4.293a1 1 0 0 1 1.415 1.415z"/>
                </svg>
            </div>:''}
            {mailState === 'failed'? <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-16 h-16 text-[#FF0000]">
                    <defs>
                    <style>
                        {`
                        .cls-1 {
                            fill: none;
                            stroke: currentColor;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-width: 2px;
                        }
                        `}
                    </style>
                    </defs>
                    <g id="cross">
                    <line className="cls-1" x1="7" x2="25" y1="7" y2="25" />
                    <line className="cls-1" x1="7" x2="25" y1="25" y2="7" />
                    </g>
                </svg>
            </div>:''}
        </div>
    )
}

export default Mail