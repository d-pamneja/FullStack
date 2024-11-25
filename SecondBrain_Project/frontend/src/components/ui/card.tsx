"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineLink } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { cn } from "@/lib/utils";
import Button from "./button";
import { Dialog, DialogTrigger,DialogContent, DialogHeader, DialogTitle,DialogDescription,DialogClose} from "./dialog";

export const WobbleCard = ({
  children,
  containerClassName,
  className, 
  id,
  title,
  link,
  deleteFunction
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  id? : string,
  title : string,
  link? : string,
  deleteFunction : (id : string)=> Promise<any>
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };
  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
      }}
      className={cn(
        "mx-auto w-full bg-indigo-800 relative rounded-2xl overflow-hidden",
        containerClassName
      )}
    >
      
    {link && (
      <a 
        target="_blank"  
        href={link} 
        rel="noopener noreferrer" 
        className="absolute top-4 right-20 flex items-center text-white hover:bg-black/30 z-50 bg-black/20 p-2 rounded-full backdrop-blur-sm"
      >
        <AiOutlineLink className="w-6 h-6 stroke-current" />
      </a>
    )}

    {id && (
      <Dialog>
        <DialogTrigger asChild>
            <Button 
            variant={"ghost"}
            className="absolute top-4 right-4 flex items-center text-white hover:bg-black/30 z-50 bg-black/20 p-2 rounded-full backdrop-blur-sm"
            startIcon={<AiOutlineDelete className="w-6 h-6 stroke-current" />}
          />
        </DialogTrigger>
        <DialogContent className="md:max-w-[500px] sm:max-w-[425px] max-w-[300px] rounded-xl">
          <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete this item?
              </DialogTitle>
              <DialogDescription>
                This action is irreversible.
              </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button
              variant={"destructive"}
              text={"Delete"}
              onClick={()=>{
                deleteFunction(id)
              }}
            />
            <DialogClose asChild>
              <Button
                variant={"ghostDark"}
                text={"Cancel"}
              />
            </DialogClose>
            </div>
        </DialogContent>
      </Dialog>
    )}

    {title && (
        <h2 className="absolute top-4 left-4 max-w-80 flex items-center text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          {title}
        </h2>
    )}

    <div
      className="relative h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] sm:mx-0 sm:rounded-2xl overflow-hidden"
      style={{
        boxShadow:
          "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
      }}
    >
      <motion.div
        style={{
          transform: isHovering
            ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
            : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
          transition: "transform 0.1s ease-out",
        }}
        className={cn("h-full px-4 py-20 sm:px-10 relative", className)}
      >
        <Noise />
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
    </motion.section>
  );
};

const Noise = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full scale-[1.2] transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
      style={{
        backgroundImage: "url(/noise.webp)",
        backgroundSize: "30%",
      }}
    ></div>
  );
};
