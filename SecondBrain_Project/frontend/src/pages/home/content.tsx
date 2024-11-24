"use client";
import { useState,useEffect } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "../../components/ui/pagination";
import { WobbleCard } from "../../components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { viewContent } from "@/helpers/communicator";
import { Badge } from "@/components/ui/badge";
import LinkPreview from "@/components/ui/linkPreview";

export function CardStack() {
    const {isLoggedIn} = useAuth()
  
    // Content
    type ContentValues = {
      _id : string,
      title : string,
      link : string,
      type : string,
      tags : string[]
    }
  
    const fetchContent = async () : Promise<ContentValues[]> => {
      if(isLoggedIn){
        const res = await viewContent()
        return res.response
      }
      return []
    }
  
    const [content, setContent] = useState<ContentValues[]>([]);
  
    useEffect(() => {
      const loadContent = async () => {
        try {
          const data = await fetchContent();
          setContent(data); 
        } catch (error) {
          console.error("Error fetching content:", error); 
        }
      };
  
      loadContent();
    }, []);
  
  
    // Pages
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(content.length / itemsPerPage);
  
    const handleChangePage = (page: number) => {
      setCurrentPage(page);
    };
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = content.slice(startIndex, startIndex + itemsPerPage);
  
    return (
      <div>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-6">
          {currentItems.map((card, index) => (
            <EntryCard 
              key={index} 
              id = {card._id}
              title={card.title} 
              link={card.link} 
              type={card.type} 
              tags={card.tags.map((tag) => tag)}
            />
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
  
export function EntryCard({ id,title, link, type, tags }: { id : string,title: string; link: string; type: string; tags: string[] }) {
    return (
        <div className="max-w-8xl mx-auto md:w-full w-4/5">
            <WobbleCard
                containerClassName="md:min-h-[350px] min-h-[400px] md:max-h-[350px] max-h-[400px] flex flex-col justify-between z-0"
                id = {id}
                title={title}
                link={link}
            >
                <LinkPreview url={link} />

                <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200" >
                    <Badge variant="secondary" onClick={()=>{
                        console.log("Clicked")
                    }}>
                        {type}
                    </Badge>
                </p>
                <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">  
                    {tags.map((tag) => (
                        <Badge className="mx-1 mb-1" key={tag} variant="default">{tag}</Badge>
                    ))}
                </p>
            </WobbleCard>
        </div>
    );
}

export default {CardStack}