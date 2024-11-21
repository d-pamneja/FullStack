import Home from "@/pages/home/home"
import Login from "@/pages/login/login"
import SignUp from "@/pages/signup/signup"
import NotFound from "@/pages/notfound/notFound"
import Landing from "@/pages/landing/landing"

export const nav = [
    {
        path : "/home", name : "Home", element : <Home/>, isRestricted : true
    },
    {
        path : "/login", name : "Login", element : <Login/>, isRestricted : false
    },
    {
        path : "/signup", name : "SignUp", element : <SignUp/>, isRestricted : false
    },
    {
        path : "*", name : "Not Found", element : <NotFound/>, isRestricted : false
    },
    {
        path : "/", name : "Landing", element : <Landing/>, isRestricted : false
    }
]