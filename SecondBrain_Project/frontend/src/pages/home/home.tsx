"use client";
import { Button } from '../../components/ui/button'
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import { AppSidebar } from '../../components/ui/app-sidebar'
import { useMediaQuery } from "react-responsive";
import { WobbleCard } from "../../components/ui/card";
import { CiShare2 } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { cn } from "../../lib/utils"

export function Home() {

  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-between w-full'>
        <MainSidebar/>
        <div className='flex flex-col w-full space-y-10'>
          <Header/>
          <CardStack/>
        </div>
      </div>
    </div>      
  )
}

export function MainSidebar() {
  return (
    <div className="flex justify-start">
        <SidebarProvider>
          <AppSidebar/>
          <SidebarTrigger/>
        </SidebarProvider>
      </div>
  )
}

export function Header(){
  return (
    <div className='flex lg:flex-row flex-col lg:justify-between w-full'>
      <h1 className='text-5xl font-bold mx-4'>Workspace</h1>
      <ButtonDiv className="lg:justify-end justify-center lg:my-0 my-[20px]"/>
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

export function CardStack(){
  return (
    <div className='grid grid-cols-3 gap-4'>
      <EntryCard/>
      <EntryCard/>
      <EntryCard/>
      <EntryCard/>
      <EntryCard/>
      <EntryCard/>
    </div>
  )
}

export function EntryCard() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <WobbleCard containerClassName="min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          No shirt, no shoes, no weapons.
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          If someone yells “stop!”, goes limp, or taps out, the fight is over.
        </p>
      </WobbleCard>
    </div>
  );
}


export default Home
