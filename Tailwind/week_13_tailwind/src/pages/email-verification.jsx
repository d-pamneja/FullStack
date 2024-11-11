import {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { OTP } from '../components/otp'

export function VerifyEmail() {
    const location = useLocation()
    const EmailID = location.state? location.state : localStorage.getItem('EmailID')

    useEffect(()=>{ // To store email in local storage, whenever there is a change in EmailID variable
        if(EmailID){
            localStorage.setItem('EmailID',EmailID)
        }
    },[EmailID])

    return(
        <div className="h-screen flex flex-col items-center justify-center space-y-5">
            <Heading/>
            <Text emailID={EmailID}/>
            <Boxes emailID={EmailID}/>
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

function Text(props){

    return (
        <>
        <div className='flex flex-col items-center py-10'>  
            <h2 className="absolute top-72 flex flex-col items-center text-3xl text-white mb-10 my-5 font-bold">Check Your Email For A Code</h2>
            <h3 className="text-blue-200 mt-10 mb-5 flex items-center">Please enter the verification code sent to your email id : <p className='text-white font-semibold lg:ml-2 ml-0'>{props.emailID}</p> </h3>
        </div>
        </>
    )
}

function Boxes(props){
    
    return(
        <>
        <div className="relative flex flex-col items-center space-y-20">
            <OTP number={6}/>
            <button className="bg-blue-200 text-xl rounded-xl w-64 px-5 py-4 text-white hover:bg-blue-150" onClick={() => console.log("In progress")}>Continue</button>
        </div>
            
        </>
    )
}


