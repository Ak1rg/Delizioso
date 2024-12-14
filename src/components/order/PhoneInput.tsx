import { useEffect, useRef, useState } from "react";
import { FieldErrors,UseFormRegister, UseFormWatch, FieldValues,Path } from "react-hook-form";

interface PhoneInputProps<TFormValues extends FieldValues> {
    register: UseFormRegister<TFormValues>;
    watch: UseFormWatch<TFormValues>;
    errors: FieldErrors<TFormValues>;
    name: Path<TFormValues>;
}

const PhoneInput = <TFormValues extends FieldValues>({ register, watch,errors, name }: PhoneInputProps<TFormValues>) => {

    const [open, setOpen] = useState<boolean>(false)
    const [country, setCountry] = useState<string>('germany')

    const value = watch(name);

    const countries = ['germany','usa','uk','russia']

    const selectRef = useRef<HTMLDivElement>(null);

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
        setCountry(e)
        setOpen(false)
    }

    return (
        <div ref={selectRef} className="relative w-full">
            <input 
                type="tel" 
                placeholder="Phone number" 
                value={value || ``}
                {...register(name,{
                    required:true,
                    maxLength:50,
                    pattern:{
                        value:/^[0-9]*$/, 
                        message:'',
                    },
                })}
                style={{border:`solid 1px ${errors?.number?'red':'rgb(208,204,199,0.1)'}`}}
                className="w-full pr-[20px] xs:pl-[100px] lg:pl-[150px] xs:py-[18px] lg:py-[36px] xs:text-[12px] lg:text-[25px]
                font-poppins font-[400] xs:leading-[110%] lg:leading-[18px] xs:rounded-[10px] lg:rounded-[20px]
                bg-[rgb(208,204,199)] bg-opacity-10 text-colorB"
            />
            <div
                onClick={() => setOpen(e => !e)}
                className="absolute xs:top-[calc(50%-17.5px)] lg:top-[calc(50%-35px)] xs:left-[10px] lg:left-[25px] bg-white xs:w-[50px] lg:w-[100px] xs:h-[35px] lg:h-[70px] rounded-[10px]">
                <img className="ml-auto mr-auto xs:mt-[6px] lg:mt-[12px] xs:w-[24px] lg:w-[48px] xs:h-[24px] lg:h-[48px]" src={`./img/reservation/${country}.png`} alt="" />
            </div>
            <div className={`flex flex-col w-full absolute xs:left-[11px] lg:left-[25px] xs:top-[60px] lg:top-[90px] rounded-b-[10px] bg-white
                overflow-hidden transition-[max-height] duration-300 ease-in-out font-poppins xs:text-[12px]
                lg:text-[20px] xs:leading-[34px] lg:leading-[110%] font-[400] z-[3]
                max-h-[300px] xs:max-w-[50px] lg:max-w-[100px]
                ${open ? ' lg:max-h-[300px]' : 'max-h-0'} ${open==true?'visible':'invisible'}`}>
                {
                    countries.map((e:string,i:number) => (
                        <img
                            onClick={() => clickOption(e)}
                            key={i}
                            className="ml-auto mr-auto xs:w-[23px] lg:w-[48px] xs:min-h-[39px] lg:min-h-[48px] py-[8px]"
                            src={`./img/reservation/${e}.png`} alt="" />
                    ))
                }
            </div>
        </div>
    )
}

export default PhoneInput