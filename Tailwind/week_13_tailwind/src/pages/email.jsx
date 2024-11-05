import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export function Email() {
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
    return (
        <>
            <h2 className="absolute top-72 flex flex-col items-center text-3xl text-white mb-5 my-5 font-bold">Let's Get Started</h2>
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
            navigate('/verify-email',{state : EmailID})
        }
        else{
            alert("Enter a valid Email ID")
        }

    }
    

    return(
        <>
        <div className="relative flex flex-col items-center space-y-4 mt-10">
            <input className="bg-blue-100 text-xl text-white rounded-xl w-64 px-5 py-4" placeholder="Email id" onChange={changeEmailID}></input>
            <button className="bg-blue-200 text-xl rounded-xl w-64 px-5 py-4 text-white hover:bg-blue-150" onClick={() => verifyEmail(EmailID)}>Continue</button>
        </div>
            
        </>
    )
}


