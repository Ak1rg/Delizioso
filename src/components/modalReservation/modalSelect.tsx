import {  useEffect, useRef, useState } from "react"

const ModalSelect = () => {
    const [value, setValue] = useState<string>('Accasion')
    const [open, setOpen] = useState<boolean>(false)

    const selectRef = useRef<HTMLDivElement>(null);

    const arr =['Black friday','New year','Hallowen','Christmas']

    const clickClose = (e: MouseEvent): void => {
        if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (open) {
        document.addEventListener("click", clickClose);
        } else {
        document.removeEventListener("click", clickClose);
        }
        return () => {
            document.removeEventListener("click", clickClose);
        };
    }, [open]);

    const clickOption = (e:string) => {
        setValue(e)
        setOpen(false)
    }

    return (
        <div ref={selectRef} className={"selectModal relative lg:max-w-[520px] w-full mt-[40px]"}>
            <div 
                onClick={() => setOpen(v => !v)}
                className="selectModal xs:py-[18px] lg:py-[40px] xs:px-[33px] lg:px-[50px]  xs:rounded-[10px] lg:rounded-[20px] flex items-end
            bg-[rgb(208,204,199,0.1)] font-poppins xs:text-[12px] lg:text-[20px] xs:leading-[34px] lg:leading-[110%]
            font-[400] select-none text-colorBd">
                {value}
                <img className={`absolute right-[50px] xs:w-[10px] lg:w-[24px] xs:top-[30px] lg:top-[46px] duration-200 ${open?'rotate-180':''}`} src="./img/reservation/select_arrow.png" alt="" />
            </div>
            <div className={`flex flex-col w-full absolute left-0 xs:top-[70px] lg:top-[100px] rounded-[20px] bg-[#fafaf9]
                overflow-hidden transition-[max-height] duration-300 ease-in-out font-poppins xs:text-[12px]
                lg:text-[20px] xs:leading-[34px] lg:leading-[110%] font-[400] z-[3] border-colorBd border-[1px]
                border-solid max-h-[230px] overflow-y-scroll 
                ${open ? 'max-h-[500px]' : 'max-h-0'} ${open==true?'visible':'invisible'}`}>
                {
                    arr.map((e:string,i:number) => (
                        <p className="xs:py-[18px] lg:py-[40px] xs:px-[33px] lg:px-[50px] w-full text-colorBd" key={i} onClick={() => clickOption(e)}>{e}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default ModalSelect