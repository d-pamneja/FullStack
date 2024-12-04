import { any, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "../../lib/utils"
import { useState,useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from '../../components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'react-hot-toast';
import { useAuth } from "@/context/AuthContext";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { FancyMultiSelect } from "@/components/ui/multi-select";
import type { Tag } from "@/components/ui/multi-select";
import { useForm,SubmitHandler,Controller } from "react-hook-form"
import { IoMdDocument} from "react-icons/io";
import { addContent } from "@/helpers/communicator";
import { ConvexProvider, useMutation } from 'convex/react';
import { api } from "../../../convex/_generated/api"
import { addDocument, deleteDocument, viewDocument } from "../../helpers/communicator";


export const ButtonDiv = ({className} : {className? : string} )=> {
    const { isLoggedIn } = useAuth()

    // Content Form and Functionalities
    const contentFormSchema = z.object({
      title: z.string().min(1, "Kindly enter a valid title."),
      link: z.string().url({ message: "Invalid URL" }),
      type: z.string().refine((type)=>["text","audio","image","video"].includes(type),"Select a valid type."),
      description : z.string().optional(),
      tags : z.array(z.object({
        value : z.string()
      })).nonempty({message : "Kindly enter at least one tag"})
    });
    
    type ContentFormValues = z.infer<typeof contentFormSchema>;
    
    const addContentOnSubmitHandler: SubmitHandler<ContentFormValues> = async (data) => {
      const { title, link, type, tags,description } = data;
      try {
        if(isLoggedIn){
          const res = description ? await addContent(title,link,type,tags,description) : await addContent(title,link,type,tags)
          if (res) {
            toast.success('Content Added Successfully', { id: 'addContent' });
            setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          }
      } catch (error : any){
        if(error.status===400){
          console.log(error)
          return toast.error(`Could not add the content : ${error.response.data.message} `, { id: 'addContent' });
        }
      }
    };
    
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

    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    
    const contentForm = useForm<z.infer<typeof contentFormSchema>>({
      resolver: zodResolver(contentFormSchema),
      defaultValues: {
        title: "",
        link: "",
        type: "",
        description : "",
        tags: [],
      },
    });

    useEffect(() => { // Hook to update values of tags selected
      // @ts-ignore
      contentForm.setValue("tags", selectedTags);
    }, [selectedTags, contentForm]);
    
    // Adding Documents Form and Functionalities

    // Add Document - AWS
    const addDocumentFormSchema = z.object({
      type: z.string().refine((type)=>["text","pdf"].includes(type),"Select a valid type."),
      filename : z.string().min(1,"Kindly enter a valid file name"),
      file : z.any()
    });
    
  type AddDocumentFormValues = z.infer<typeof addDocumentFormSchema>;

  const addDocumentForm = useForm<z.infer<typeof addDocumentFormSchema>>({
      resolver: zodResolver(addDocumentFormSchema),
      defaultValues: {
          filename : "",
          type : ""
      },
  });

    const setDocument : SubmitHandler<AddDocumentFormValues> = async (data)=>{
      const {type,filename,file} = data
      const userID = localStorage.getItem("userID")!
      const contentType = file[0].type
      const fileObject = file[0]
      try {
        const res = await addDocument(userID, type, filename, contentType, fileObject);
        
        const AWSData = {
          title : filename,
          type : type,
          key : res
        }

        return addDocumentConvexOnSubmitHandler(AWSData)

      } catch (error) {
          console.error("Upload failed on AWS:", error);
      }
    }

    // Convex Schema
    const documentConvexFormSchema = z.object({
        title: z.string().min(1, "Kindly enter a valid title."),
        type: z.string().refine((type)=>["text","pdf"].includes(type),"Select a valid type."),
        key : z.string()
      });
      
    type DocumentConvexValues = z.infer<typeof documentConvexFormSchema>;

    const createDocument = useMutation(api.document.createDocument)
    const addDocumentConvexOnSubmitHandler : SubmitHandler<DocumentConvexValues> = async (data) => {
        try {
            const { title, type,key } = data
            const userID = localStorage.getItem("userID")!
            const res = await createDocument({userID : userID, type : type,title : title, key : key})
            if (res) {
                toast.success('Document Added Successfully', { id: 'addDocument' });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error : any) {
            console.log(error)
            return toast.error(`Could not add the document : ${error} `, { id: 'addDocument' });
        }
    }

  // Fetch Document - AWS
  const fetchdocumentFormSchema = z.object({
      key: z.string().min(1, "Kindly enter a valid path to file")
    });
    
  type FetchDocumentFormValues = z.infer<typeof fetchdocumentFormSchema>;

  const fetchdocumentForm = useForm<z.infer<typeof fetchdocumentFormSchema>>({
      resolver: zodResolver(fetchdocumentFormSchema),
      defaultValues: {
          key : ""
      },
  });
    

    const fetchDocument : SubmitHandler<FetchDocumentFormValues> = async (data)=>{
      const {key} = data
      const res = await viewDocument(key)
      console.log(res.url)
    }

    

    // Delete Document - AWS
    const deletedocumentFormSchema = z.object({
      key: z.string().min(1, "Kindly enter a valid path to file")
    });
    
  type DeleteDocumentFormValues = z.infer<typeof deletedocumentFormSchema>;

  const deletedocumentForm = useForm<z.infer<typeof deletedocumentFormSchema>>({
      resolver: zodResolver(deletedocumentFormSchema),
      defaultValues: {
          key : ""
      },
  });

  const removeDocument : SubmitHandler<DeleteDocumentFormValues> = async (data)=>{
    const {key} = data
    const res = await deleteDocument(key)
    console.log(res)
  }


  // Button Size Control
  const isSmall = useMediaQuery({maxWidth : 639})
  const isMedium = useMediaQuery({minWidth: 640, maxWidth : 1023})
  const size = isSmall ? "sm" : isMedium ? "md" : "lg"

    return (
      <div className={cn("flex",className)}>
        <form className="bg-red-200 my-20 mx-10 py-5" onSubmit={fetchdocumentForm.handleSubmit(fetchDocument,errorHandler)}>
          <div className="grid grid-cols-4 items-start gap-2">
              <Label htmlFor="key" className="text-left">
                Key
              </Label>
              <Input id="key" {...fetchdocumentForm.register("key")} className="col-span-3" />
            </div>
            <Button size="lg" text={"View Document"} type="submit"></Button>
        </form>
        <form className="bg-bluee-200 my-20 mx-10 py-5" onSubmit={deletedocumentForm.handleSubmit(removeDocument,errorHandler)}>
          <div className="grid grid-cols-4 items-start gap-2">
              <Label htmlFor="key" className="text-left">
                Key
              </Label>
              <Input id="key" {...deletedocumentForm.register("key")} className="col-span-3" />
            </div>
            <Button size="lg" text={"Delete Document"} type="submit"></Button>
        </form>
        <Dialog>
            <DialogTrigger asChild>
              <Button
                  variant={"primary"}
                  size={size}
                  text="Add Documents"
                  startIcon={<IoMdDocument/>}
              />
            </DialogTrigger>
            <DialogContent className="md:max-w-[600px] sm:max-w-[425px] max-w-[325px] rounded-xl">
              <form onSubmit={addDocumentForm.handleSubmit(setDocument,errorHandler)}>
                <DialogHeader>
                  <DialogTitle>Add Document</DialogTitle>
                  <DialogDescription>
                    Drop it like it's hot!
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {/* Filename */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="filename" className="text-left">
                      Title
                    </Label>
                    <Input id="filename" {...addDocumentForm.register("filename")} className="col-span-3" />
                  </div>

                  {/* Type */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="type" className="text-left">
                      Type
                    </Label>
                    <Controller
                      name="type"
                      control={addDocumentForm.control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="md:w-[410px] sm:w-[280px] w-[205px]">
                            <SelectValue placeholder="Select the type of document" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Document Type</SelectLabel>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="pdf">PDF</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* File Upload */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="file" className="text-left">
                      File
                    </Label>
                    <Input id="file" type="file" {...addDocumentForm.register("file")} className="col-span-3" />
                  </div>
                  

                </div>
                {/* Footer */}
                <DialogFooter>
                  <Button size="lg" text={"Add Document"} type="submit"></Button>
                </DialogFooter>
              </form>
              </DialogContent>
        </Dialog>
      </div>
        
    )
}

export default {ButtonDiv}