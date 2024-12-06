"use-client"
import { cn } from "../../../../lib/utils";
import { api } from "../../../../../convex/_generated/api"
import { useMutation } from "convex/react"
import { useNavigate, useParams } from 'react-router-dom';
import { Id } from "../../../../../convex/_generated/dataModel";
import { SetStateAction, useEffect, useState } from "react";
import { viewDocument } from "../../../../helpers/communicator";
import Button from "../../../../components/ui/button";
import { Switch } from "@/components/ui/switch"
import { useMediaQuery } from "react-responsive";
import { IoMdArrowBack,IoMdChatbubbles } from "react-icons/io";
import { AppSidebar } from "../../../../components/ui/app-sidebar";
import { SidebarProvider,SidebarTrigger } from "../../../../components/ui/sidebar";
import {Input} from "../../../../components/ui/input";

type DocumentValues = {
  _id : Id<"documents">,
  userID : string,
  _creationTime : number,
  title : string,
  key : string,
  type : string,
  date : number,
  description? : string
}

export function DocumentView() {
  const { docID } = useParams<{ docID: string }>();
  const _id: Id<"documents"> = docID as Id<"documents">;


  const fetchConvexDoc = useMutation(api.document.viewDocument)

  const [document,setDocument] = useState<DocumentValues>()
  const [docLink,setDocLink] = useState<string>("")

  useEffect(()=>{
    const fetchDoc = async (_id : Id<"documents">)=>{
      const res = await fetchConvexDoc({_id})
      if(res){
        setDocument(res)
        const fetchLink = await viewDocument(res.key)
        if(fetchLink){
          setDocLink(fetchLink.url)
          console.log(fetchLink.url) // Debug
        }
        else{
          console.error(`Could not find the AWS Link for given document`)
        }
      }
      else{
        console.error(`Could not find the Convex document`)
      }

    }

    fetchDoc(_id)
  },[])


  return (
    <div className='flex flex-col w-full my-10'>
      <div className='flex justify-between w-full'>
        <MainSidebar/>
        {document && (
          <div className='flex flex-col w-full space-y-10'>
            <Header title={document.title}/>
            <div className='mx-10'>
              <DocPage document={document!} docLink={docLink} />
            </div>
          </div>
        )}
      </div>
    </div>      
  )
}

export function Header({title}:{title : string}){
  return (
    <div className='flex lg:flex-row flex-col lg:justify-between w-full'>
      <h1 className='text-5xl font-bold mx-4'>{title}</h1>
      <ButtonDiv className="lg:justify-end justify-center lg:my-0 my-[20px]"/>
    </div>
  )
}

export const ButtonDiv = ({className} : {className? : string} )=> {
  const navigate = useNavigate()
// Button Size Control
const isSmall = useMediaQuery({maxWidth : 639})
const isMedium = useMediaQuery({minWidth: 640, maxWidth : 1023})
const size = isSmall ? "sm" : isMedium ? "md" : "lg"

  return (
    <div className={cn("flex",className)}>
        <Button
            variant={"primaryDoc"}
            size={size}
            text="Documents Dashboard"
            startIcon={<IoMdArrowBack/>}
            onClick={()=>{
              const redirect = "/documents"
              navigate(redirect)
            }}
        />
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

export function DocPage({document,docLink}:{document : DocumentValues,docLink : string}){
  const isPDF = document.type==="pdf" ? true : false
  const [chatMode,setChatMode] = useState(false)
  
  return (
      <main className="space-y-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-start items-center gap-2">
            <div className="font-semibold text-l">
              Chat Mode
            </div>
            <div className="flex justify-center">
              <Switch
                checked={chatMode} 
                onCheckedChange={() => {
                  setChatMode(!chatMode)
                }}
              />
            </div>
          </div>
          <div className="bg-slate-700 p-4 rounded h-[550px]">
            {!chatMode && (
                <iframe
                  className={`w-full h-full rounded ${isPDF ? "" : "bg-white"}`}
                  src={docLink}
                />
            )}
            
            {chatMode && (<ChatBox/>)}
          </div>
          
        </div>
        {!document && <h1>Document Not Found</h1>}
      </main>
  )
}

export function ChatBox(){
  

  return (
    <div className={`flex justify-start rounded bg-indigo-900 w-full h-full text-white`}>
      Chat Mode
      
    </div>
  )
}


export default DocumentView