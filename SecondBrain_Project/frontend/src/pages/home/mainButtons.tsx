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
import { CiShare2 } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { addContent } from "@/helpers/communicator";

export const ButtonDiv = ({className} : {className? : string} )=> {
    const { isLoggedIn } = useAuth()

    const formSchema = z.object({
      title: z.string().min(1, "Kindly enter a valid title."),
      link: z.string().url({ message: "Invalid URL" }),
      type: z.string().refine((type)=>["text","audio","image","video"].includes(type),"Select a valid type."),
      tags : z.array(z.object({
        value : z.string()
      })).nonempty({message : "Kindly enter at least one tag"})
    });
    
    type FormValues = z.infer<typeof formSchema>;
    
    const addContentOnSubmitHandler: SubmitHandler<FormValues> = async (data) => {
      const { title, link, type, tags } = data;
      try {
        if(isLoggedIn){
          const res = await addContent(title,link,type,tags)
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
    
    const addContentOnErrorHandler = (errors: any) => {
      let errorsArray: string[] = [];
      Object.keys(errors).forEach((field) => {
        errorsArray.push(errors[field]?.message || "Invalid input");
      });
    
      if (errorsArray.length > 0) {
        toast.error(errorsArray[0]); 
      }
    };

    const isSmall = useMediaQuery({maxWidth : 639})
    const isMedium = useMediaQuery({minWidth: 640, maxWidth : 1023})
    const size = isSmall ? "sm" : isMedium ? "md" : "lg"
    
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        link: "",
        type: "",
        tags: [],
      },
    });

    useEffect(() => { // Hook to update values of tags selected
      // @ts-ignore
      form.setValue("tags", selectedTags);
    }, [selectedTags, form]);

    return (
      <Dialog>
        <div className={cn("flex",className)}>
            <Button
                variant={"secondary"}
                size={size}
                text="Share Content"
                startIcon={<CiShare2/>}
                onClick={shareContentHandler}
            />
            <DialogTrigger asChild>
              <Button
                  variant={"primary"}
                  size={size}
                  text="Add Content"
                  startIcon={<IoIosAdd/>}
              />
            </DialogTrigger>
            <DialogContent className="md:max-w-[600px] sm:max-w-[425px] max-w-[325px] rounded-xl">
              <form onSubmit={form.handleSubmit(addContentOnSubmitHandler,addContentOnErrorHandler)}>
                <DialogHeader>
                  <DialogTitle>Add Content</DialogTitle>
                  <DialogDescription>
                    Go ahead and log that awesome piece of information for your second brain!!
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {/* Title */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="title" className="text-left">
                      Title
                    </Label>
                    <Input id="title" {...form.register("title")} className="col-span-3" />
                  </div>

                  {/* Link */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="link" className="text-left">
                      Link
                    </Label>
                    <Input id="link" {...form.register("link")} className="col-span-3" />
                  </div>

                  {/* Type */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="type" className="text-left">
                      Type
                    </Label>
                    <Controller
                      name="type"
                      control={form.control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="md:w-[410px] sm:w-[280px] w-[205px]">
                            <SelectValue placeholder="Select the type of data" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Content Type</SelectLabel>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="audio">Audio</SelectItem>
                              <SelectItem value="image">Image</SelectItem>
                              <SelectItem value="video">Video</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* Tags */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="tags" className="text-left">
                      Tags
                    </Label>
                    <div className="col-span-3">
                      <FancyMultiSelect
                        selected={selectedTags}
                        setSelected={setSelectedTags}
                      />
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <DialogFooter>
                  <Button size="lg" text={"Add Content"} type="submit"></Button>
                </DialogFooter>
              </form>
              </DialogContent>
        </div>
      </Dialog>
    )
}

const shareContentHandler = ()=>{
    console.log("content shared")
}

export default {ButtonDiv}