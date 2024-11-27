import Navbar from "./navbar"
import { IntroCard } from "./intro/introCard"
import { IntroHeading } from "./intro/introHeading";
import {motion, useMotionTemplate, useMotionValue,animate, easeInOut} from "framer-motion"
import { useEffect } from "react";

export function Landing(){
    // Intro Section - Auora Effect
    const COLORS = ["#13FFAA","#1E67C6","#CE84CF","#DD335C"]
    const color = useMotionValue(COLORS[0])
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%,white 20%,${color})`

    useEffect(()=>{
        animate(color,COLORS,{
            ease : easeInOut,
            duration : 10,
            repeat : Infinity,
            repeatType : "mirror"
        })
    },[])

    return (
        <div>
            <Navbar/>
            <motion.section 
                id="intro-section" 
                className="flex justify-between items-center bg-black md:flex-row flex-col min-h-screen"
                style={{
                    backgroundImage
                }}
            >
                <IntroHeading/>
                <IntroCard 
                    className={`mr-10`}
                />
            </motion.section>
            
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