import {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { OTP } from '../components/otp'

export function VerifyEmail() {
    return(
        <div className="h-screen flex flex-col items-center justify-center space-y-5">
            <Heading/>
            <Text/>
            <Boxes/>
        </div>
    )
}

function Heading() {
    return (
        <header className="absolute top-10 flex flex-col items-center">
            <h1 className="text-4xl text-blue-150 font-light">Webinnar.gg</h1>
        </header>
    )
} 

function Text(){
    const location = useLocation()
    const emailID = location.state

    return (
        <>
        <div className='flex flex-col items-center py-10'>  
            <h2 className="absolute top-72 flex flex-col items-center text-3xl text-white mb-10 my-5 font-bold">Check Your Email For A Code</h2>
            <h3 className="text-blue-200 mt-10 mb-5 flex items-center">Please enter the verification code sent to your email id : <p className='text-white font-semibold ml-2'>{emailID}</p> </h3>
        </div>
        </>
    )
}

function Boxes(){
    const [EmailID,setEmailID] = useState('')
    const navigate = useNavigate()

    const changeEmailID = (e) =>{
        setEmailID(e.target.value)
    }

    function verifyEmail(EmailID){
        var re = /\S+@\S+\.\S+/;
        const emailCheck = re.test(EmailID);
    
        if(emailCheck){
            navigate('/verify-email')
        }
        else{
            alert("Enter a valid Email ID")
        }

    }
    

    return(
        <>
        <div className="relative flex flex-col items-center space-y-20">
            <OTP/>
            <button className="bg-blue-200 text-xl rounded-xl w-64 px-5 py-4 text-white hover:bg-blue-150" onClick={() => verifyEmail(EmailID)}>Continue</button>
        </div>
            
        </>
    )
}


