import Navbar from "./navbar"
import { IntroCard } from "./intro/introCard"
import { IntroHeading } from "./intro/introHeading";
import {motion, useMotionTemplate, useMotionValue,animate, easeInOut} from "framer-motion"
import { useEffect } from "react";
import { FeatureGrid } from "./features/grid";

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
                className="flex justify-between items-center md:flex-row flex-col min-h-screen"
                style={{
                    backgroundImage
                }}
            >
                <IntroHeading/>
                <IntroCard 
                    className={`mr-10`}
                />
            </motion.section>
            
            <div 
                id="feature-section" 
                className="min-h-screen"
                style={{
                    backgroundImage : 'linear-gradient(135deg, #f5f7fa, #e4ebf0)',
                    padding: '4rem 1rem'
                }}
            >
                <FeatureGrid/>
            </div>
            <div id="contact-section" className="h-[1000px] bg-grey-400">
                Section 3
            </div>
        </div>
    )
}



export default Landing