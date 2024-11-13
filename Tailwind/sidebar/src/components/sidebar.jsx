import { useEffect, useState } from "react"

// // Naive Approach
// export function Sidebar(){ 
//     return(
//         <main className="flex w-screen h-screen">
//             <div className="transition-all duration-1000 bg-red-300 p-4 md:w-52 w-12 hover:bg-red-100 hover:p-8 hidden md:block"> {/*Setting display to block makes it appear. So by default the sidebar is hidden, once we cross md threshold, it appears*/}
//                 Sidebar
//             </div>
//             <div className="bg-green-200 w-full">
//                 Content
//             </div>
//         </main>
//     )
// }

// // Better Approach 1 - Controlling Width
// export function Sidebar(){
//     return(
//         <main className="flex w-screen h-screen">
//             <div className="transition-all duration-1000 bg-red-300 p-4 md:w-52 w-16 hover:bg-red-100 hover:p-8"> {/*Note that : Here, we are controlling the width based on breakpoint, and using animations, we are controlling the duration of the change of width effectively rendering an animation*/}
//                 Sidebar
//             </div>
//             <div className="bg-green-200 w-full">
//                 Content
//             </div>
//         </main>
//     )
// }

// // Better Approach - Using Translate
// export function Sidebar(){
//     return(
//         <div className="flex w-screen h-screen">
//             <div className="transition-all duration-1000 bg-red-300 p-4 md:-translate-x-84 md:w-96 translate-x-0 w-0"> {/*Note that here, by default the width is 0, and this element will be moved to the left till (translate-x-0) 0 i.e will be moved away from the screen. However, if the screen becomes bigger than equal to md, it's width becomes 96 and it will translate back to translate-x-84 (a slow transition to almost entire width*/}
//                 Sidebar
//             </div>
//             <div className="bg-green-200 w-full">
//                 Content
//             </div>
//         </div>
//     )
// }

// Best Approach - Device Based Button Controlled Sidebar which automatically closes when screen size goes below threshold

const useMediaQuery = (query)=>{
    const [matches,setMatches] = useState(false)

    useEffect(()=>{
        const media = window.matchMedia(query)
        if(media.matches != matches){
            setMatches(media.matches)
        }

        const listner = () => setMatches(media.matches)
        media.addListener(listner)

        return () => media.removeListener(listner)
    },[matches,query])

    return matches
}

export function Sidebar(){
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const isDesktop = useMediaQuery("(min-width:992px)")

    useEffect(()=>{
        if(isDesktop==false){
            setSidebarOpen(false)
        }
        else{
            setSidebarOpen(true)
        }
    },[isDesktop])

    return(
        <div>
            <div className="flex mx-2">
                <div className={`${sidebarOpen ? "w-72" : "w-20"} h-screen transition-all duration-300 dark:bg-white bg-white border-2 shadow-lg`}>
                    <div className={`h-full bg-grey-50 ${sidebarOpen ? "p-4" : "p-2"}`}>
                        <button onClick={() => {
                            setSidebarOpen(e => !e)
                        }} className="">
                            {sidebarOpen ? "Close" : "Open"}
                        </button>
                        {sidebarOpen && 
                            <div className="flex items-start justify-between">
                                <div className="bg-blue-500 rounded-md pd-2 text-sm flex">
                                    <div className="text-white">Webinar</div><div className="text-green-400">.gg</div>
                                </div>
                            </div>
                        }

                        <div>
                            <ListItem size={sidebarOpen ? "lg" : "sm"} title={"Home"} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-8 w-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            }/>
                            <ListItem size={sidebarOpen ? "lg" : "sm"} title={"Home"} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-8 w-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            }/>
                            <ListItem size={sidebarOpen ? "lg" : "sm"} title={"Home"} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-8 w-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            }/>
                            <ListItem size={sidebarOpen ? "lg" : "sm"} title={"Home"} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-8 w-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            }/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

function ListItem({size,title,icon}){
    if(size=="sm"){
        return <div className="hover:bg-slate-200 flex justify-between cursor-pointer rounded-xl text-blue-500 p-2 my-4">
            <div>
                {icon}
            </div>
        </div>
    }
    
    else{
        return(
            <div className="hover:bg-slate-200 flex justify-between cursor-pointer rounded-xl text-blue-500 p-2 my-4">
                <div>
                    {icon}
                </div>
                <div>
                    {title}
                </div>
            </div>
        )
    }
}


export default Sidebar