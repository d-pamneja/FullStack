import { useRef } from "react"

export const OTP = () => {

    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()
    const ref5 = useRef()
    const ref6 = useRef()


    return (
        <>
            <div className="flex justify-center">
                <OTPbox reference={ref1} onDone={()=>{
                    ref2.current.focus()
                }}/>
                <OTPbox reference={ref2} onDone={()=>{
                    ref3.current.focus()
                }}/>
                <OTPbox reference={ref3} onDone={()=>{
                    ref4.current.focus()
                }}/>
                <OTPbox reference={ref4} onDone={()=>{
                    ref5.current.focus()
                }}/>
                <OTPbox reference={ref5} onDone={()=>{
                    ref6.current.focus()
                }}/>
                <OTPbox reference={ref6}/>
            </div>
        </>
    )
}

function OTPbox(
    {reference,onDone}
){

    return(
        <>
            <input ref={reference} onChange={(e)=>{
                onDone()
            }} type="text" className="w-[40px] h-[50px] rounded-2xl bg-blue-100 text-white text-center m-1 outline-none"></input> 
        </>
    )
}