"use client";
import { Button } from '../../components/ui/button'
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import { AppSidebar } from '../../components/ui/app-sidebar'
import { useMediaQuery } from "react-responsive";
import { WobbleCard } from "../../components/ui/card";
import { CiShare2 } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { cn } from "../../lib/utils"
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../../components/ui/pagination";

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

// Testing
const cardData = Array(18).fill(null).map((_, index) => ({
  heading: `Card ${index + 1}: No shirt, no shoes, no weapons.`,
  note: `If someone yells “stop!”, goes limp, or taps out, the fight is over. (Card ${index + 1})`,
}));



export function CardStack() {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cardData.length / itemsPerPage);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = cardData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {/* Display the cards */}
      <div className="grid grid-cols-3 gap-4">
        {currentItems.map((card, index) => (
          <EntryCard key={index} heading={card.heading} note={card.note} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination className="mt-8">
        <PaginationContent>
          {/* Previous Page */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleChangePage(Math.max(1, currentPage - 1));
              }}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleChangePage(page);
                }}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next Page */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleChangePage(Math.min(totalPages, currentPage + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export function EntryCard({ heading, note }: { heading: string; note: string }) {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <WobbleCard containerClassName="min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          {heading}
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          {note}
        </p>
      </WobbleCard>
    </div>
  );
}


export default Home
