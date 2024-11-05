import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export function Age() {
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
            <h2 className="absolute top-48 flex flex-col items-center text-3xl text-white mb-5 my-5 font-bold">Verify your Age</h2>
            <h3 className="text-blue-200">Please confirm your birth year. This data will not be stored.</h3>
        </>
    )
}

function Boxes(){
    const [YOB,setYOB] = useState(0)
    const navigate = useNavigate()

    const changeYOB = (e) =>{
        setYOB(e.target.value)
    }

    function verifyAge(YOB){
        const currentYear = new Date().getFullYear()
        const cutOff = currentYear - YOB
    
        if(cutOff>=18){
            navigate('/email')
        }
        else{
            alert("Sorry, you are underage.")
        }

    }

    return(
        <>
        <div className="relative flex flex-col items-center space-y-4 mt-60">
            <input className="bg-blue-100 text-xl text-white rounded-xl w-64 px-5 py-4" placeholder="Your Birth Year" onChange={changeYOB}></input>
            <button className="bg-blue-200 text-xl rounded-xl w-64 px-5 py-4 text-white hover:bg-blue-150" onClick={() => verifyAge(YOB)}>Continue</button>
        </div>
        </>
    )
}


