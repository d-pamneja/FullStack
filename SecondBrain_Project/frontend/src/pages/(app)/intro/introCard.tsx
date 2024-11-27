"use client";
import { CardBody, CardContainer, CardItem } from "../../../components/ui/3DCard";
import { useNavigate } from "react-router-dom";

export function IntroCard() {
  const navigate = useNavigate()

  return (
    <CardContainer className="inter-var mx-[20px]">
      <CardBody className="bg-indigo-800 relative group/card hover:shadow-4xl hover:shadow-emerald-500/[0.8] border border-grey/[0.4] w-auto sm:w-[30rem] h-auto rounded-xl p-6">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white"
        >
          Where Your Ideas Take Flight
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-sm max-w-sm mt-2 text-neutral-300 text-center"
        >
          Create, share, and manage AI-enhanced workspaces. Store everything from links to documents and get instant AI-powered insights
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="800"
            width="800"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            as={"a"}
            translateZ={20}
            href="https://twitter.com/dpamneja"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal text-white"
            
          >
            Connect Now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            onClick={()=>{
              const redirect = "./signup"
              navigate(redirect)
            }}
            className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
