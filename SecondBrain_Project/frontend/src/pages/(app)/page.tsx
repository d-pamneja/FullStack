import Navbar from "./navbar"
import { IntroCard } from "./intro/introCard"

export function Landing(){
    return (
        <div>
            <Navbar/>
            <div id="intro-section" className="flex justify-between h-[800px]">
                Intro Section
                <IntroCard/>
            </div>
            <div id="feature-section" className="h-[1000px] bg-grey-200">
                Section 2
            </div>
            <div id="contact-section" className="h-[1000px] bg-grey-400">
                Section 3
            </div>
        </div>
    )
}



export default Landing