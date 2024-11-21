import Button from "@/components/ui/button"
import { LogIn, Refrigerator } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Landing(){
    return (
        <div>
            <LandingButtons/>
        </div>
    )
}

export const LandingButtons = ()=> {
    const size = "lg"
    const navigate =  useNavigate()


    return (
        <div className="flex">
            <Button
                variant={"secondary"}
                size={size}
                text="Login"
                startIcon={<LogIn/>}
                onClick={()=>{
                    const redirect = "/login";
                    navigate(redirect);
                }}
            />
            <Button
                variant={"primary"}
                size={size}
                text="SignUp"
                startIcon={<Refrigerator/>}
                onClick={()=>{
                    const redirect = "/signup";
                    navigate(redirect);
                }}
            />
        </div>
    )
}


export default Landing