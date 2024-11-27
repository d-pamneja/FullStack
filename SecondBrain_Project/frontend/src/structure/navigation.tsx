import Home from "@/pages/home/page"
import Login from "@/pages/login/page"
import SignUp from "@/pages/signup/page"
import NotFound from "@/pages/notfound/page"
import Landing from "@/pages/(app)/page"
import View from "@/pages/externalView/page"

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
        path : "/share/viewBrain/:username/:uid", name : "External", element : <View/>, isRestricted : false
    },
    {
        path : "/", name : "Landing", element : <Landing/>, isRestricted : false
    }
]