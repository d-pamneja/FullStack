import { Button } from '../../components/ui/button'
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import { AppSidebar } from '../../components/ui/app-sidebar'
import { useMediaQuery } from "react-responsive";
import { CiShare2 } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { cn } from "../../lib/utils"

export function Home() {

  return (
    <div className='flex justify-between w-full'>
      <div className="flex justify-start">
        <SidebarProvider>
          <AppSidebar/>
          <SidebarTrigger/>
        </SidebarProvider>
      </div>
      <div className='flex lg:flex-row flex-col lg:justify-between w-full'>
        <h1 className='text-5xl font-bold mx-4'>Workspace</h1>
        <ButtonDiv className="lg:justify-end justify-center lg:my-0 my-[20px]"/>
      </div>
    </div>
      
  )
}


export const ButtonDiv = ({className} : {className? : string} )=> {
    const isSmall = useMediaQuery({maxWidth : 639})
    const isMedium = useMediaQuery({minWidth: 640, maxWidth : 1023})

    const size = isSmall ? "sm" : isMedium ? "md" : "lg"


    return (
        <div className={cn("flex",className)}>
            <Button
                variant={"secondary"}
                size={size}
                text="Share Content"
                startIcon={<CiShare2/>}
                onClick={shareContentHandler}
            />
            <Button
                variant={"primary"}
                size={size}
                text="Add Content"
                startIcon={<IoIosAdd/>}
                onClick={addContentHandler}
            />
        </div>
    )
}

const shareContentHandler = ()=>{
    console.log("content shared")
}

const addContentHandler = ()=>{
    console.log("content added")
}

export default Home
