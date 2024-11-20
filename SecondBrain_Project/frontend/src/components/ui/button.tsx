import {cva,VariantProps} from "class-variance-authority"
import { ComponentProps } from "react"
import { cn } from "../../lib/utils"

const ButtonStyles = cva( 
    ["flex","items-center"], // This means the base tailwind class which will cover all the variants
    {
        variants : { // Different types of buttons
            variant : { // Different types of variant types
                primary : ["bg-purple-500","hover:bg-purple-800","text-white"],
                secondary : ["bg-purple-100","hover:bg-purple-300","text-purple-700"]
            },
            size : { // Different types of size types
                sm : ["rounded","p-2"],
                md : ["rounded-xl","p-3"],
                lg : ["rounded-2xl","p-4"]
            }
        },
        defaultVariants : { // Default types of variants, in case nothing or something undefined is sent in
            variant : "primary",
            size : "sm"
        }
    }
) 

// Now, we will use ComponentProps from React, which can help us get all the basic defualt props made available in an HTML element or any other external library : https://www.totaltypescript.com/react-component-props-type-helper
// We will also use VariantProps to import all types from the above const ButtonStyles

type ButtonProps = VariantProps<typeof ButtonStyles> & {
    text : string
    startIcon? : HTMLImageElement  // <img> html tag
    endIcon? : HTMLImageElement  // <img> html tag
} & ComponentProps<"button"> // This combines the above ButtonStyles, our custom designed types and the basic types in button by default


export const Button = ({variant,size,className,...props} : ButtonProps) => { // Means we will be giving variant,size and our classname, along with all props defined above
    return(
        <div>
            <button 
                {...props}
                className={cn(ButtonStyles({variant,size}),className)}
            >
                {props.text}
            </button>
        </div>
    )
}

export default {Button}