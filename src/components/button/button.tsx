type ButtonProps = {
    color: string;
    px: number;
    px2: number;
    py: number;
    py2: number;
    r: number;
    t: number;
    t2: number;
    f: number;
    l: string;
    c: string;
    text: string;
};

const Button = ({color,px,px2,py,py2,r,t,t2,f,l,c,text}:ButtonProps) => {

    const paddingClass = `xs:px-[${px}px] lg:px-[${px2}px] xs:py-[${py}px] lg:py-[${py2}px]`;

    return (
        <button 
        style={{backgroundColor:color}}
        className={`${c} rounded-[${r}px]
        ${paddingClass} xs:text-[${t}px] lg:text-[${t2}px] font-[${f}] 
        font-poppins leading-[${l}] text-white`}>{text}</button>
    )
}

export default Button