import { z } from "zod"
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
    const documentFormSchema = z.object({
        title: z.string().min(1, "Kindly enter a valid title."),
        type: z.string().refine((type)=>["text","pdf"].includes(type),"Select a valid type."),
        text : z.string().max(500,"Kindly enter a message within the limit").optional()
      });
      
    type DocumentFormValues = z.infer<typeof documentFormSchema>;

    const createDocument = useMutation(api.document.createDocument)
    const addDocumentOnSubmitHandler: SubmitHandler<DocumentFormValues> = async (data) => {
        try {
            const { title, type } = data;
            const res = await createDocument({title : title, type : type})
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

    const documentForm = useForm<z.infer<typeof documentFormSchema>>({
        resolver: zodResolver(documentFormSchema),
        defaultValues: {
            title: "",
            type: "",
            text : ""
        },
    });
    
    
    // Button Size Control
    const isSmall = useMediaQuery({maxWidth : 639})
    const isMedium = useMediaQuery({minWidth: 640, maxWidth : 1023})
    const size = isSmall ? "sm" : isMedium ? "md" : "lg"

    
    return (
      <div className={cn("flex",className)}>
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
              <form onSubmit={documentForm.handleSubmit(addDocumentOnSubmitHandler,errorHandler)}>
                <DialogHeader>
                  <DialogTitle>Add Document</DialogTitle>
                  <DialogDescription>
                    Go ahead and upload that document.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {/* Title */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="title" className="text-left">
                      Title
                    </Label>
                    <Input id="title" {...documentForm.register("title")} className="col-span-3" />
                  </div>

                  {/* Type */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="type" className="text-left">
                      Type
                    </Label>
                    <Controller
                      name="type"
                      control={documentForm.control}
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

                    {/* Conditional Input Box - Text Type */}
                    {documentForm.watch('type') === 'text' && (
                    <div className="grid grid-cols-4 items-center gap-2">
                        <Label htmlFor="textInput" className="text-left">
                        Text Input
                        </Label>
                        <Controller
                            name="text"
                            control={documentForm.control}
                            render={({ field }) => (
                            <textarea
                                {...field}
                                id="text"
                                placeholder="Enter your text"
                                className="border border-gray-300 rounded px-2 py-1 md:w-[410px] sm:w-[280px] w-[205px] h-[200px]"
                            />
                        )}
                        />
                    </div>
                    )}
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