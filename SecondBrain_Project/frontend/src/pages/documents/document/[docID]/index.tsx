"use-client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "../../../../lib/utils";
import { api } from "../../../../../convex/_generated/api"
import { useMutation } from "convex/react"
import { useNavigate, useParams } from 'react-router-dom';
import { Id } from "../../../../../convex/_generated/dataModel";
import { SetStateAction, useEffect, useState } from "react";
import { useForm,SubmitHandler,Controller } from "react-hook-form"
import { queryDoc, viewDocument } from "../../../../helpers/communicator";
import Button from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {Switch} from "../../../../components/ui/switch"
import { useMediaQuery } from "react-responsive";
import { IoMdArrowBack } from "react-icons/io";
import {Loader2} from "lucide-react"
import { FaArrowUp } from "react-icons/fa"
import { toast } from 'react-hot-toast';
import { AppSidebar } from "../../../../components/ui/app-sidebar";
import { SidebarProvider,SidebarTrigger } from "../../../../components/ui/sidebar";

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
            
            {chatMode && (<ChatBox document={document}/>)}
          </div>
          
        </div>
        {!document && <h1>Document Not Found</h1>}
      </main>
  )
}

export function ChatBox({document}:{document : DocumentValues}){
  const querySchema = z.object({
    user_query : z.string().min(1,"Kindly enter a valid query")
    });
    
  type QueryValues = z.infer<typeof querySchema>;

  const queryForm = useForm<z.infer<typeof querySchema>>({    
      resolver: zodResolver(querySchema),
      defaultValues: {
        user_query : ""
      },
  });

  const sendQuery : SubmitHandler<QueryValues> = async (data)=>{ 
    try{
      const {user_query} = data
      const userID = document.userID
      const key = document.key
      const res = await queryDoc(user_query,userID,key)

      if (res) {
        toast.success('Query fetched successfully', { id: 'fetchquery' });
        console.log(res.output.response)
      }
    }
    catch (error : any) {
      console.log(error)
      return toast.error(`Could not fetch the query : ${error} `, { id: 'fetchquery' });
    }
  }
  

  const errorHandler = (errors: any) => {
    console.log(errors)
    let errorsArray: string[] = [];
    Object.keys(errors).forEach((field) => {
      errorsArray.push(errors[field]?.message || "Invalid input");
    });

    if (errorsArray.length > 0) {
      toast.error(errorsArray[0]); 
    }
  };

  return (
    <div className={`flex justify-start rounded bg-indigo-900 w-full h-full text-white`}>
      Chat Mode
        <form className="flex justify-end items-end my-5 w-full" onSubmit={queryForm.handleSubmit(sendQuery,errorHandler)}>
            <Input id="user_query" type="user_query" {...queryForm.register("user_query")} className="h-[50px] bg-white text-black" />
            {!queryForm.formState.isSubmitting && (
              <Button size={"xl"} startIcon={<FaArrowUp/>} type="submit"></Button>
            )}
            {queryForm.formState.isSubmitting && (
              <Button size={"xl"} startIcon={<Loader2 className="animate-spin"/>} type="submit"></Button>
            )}
            
        </form>
    </div>
  )
}


export default DocumentView