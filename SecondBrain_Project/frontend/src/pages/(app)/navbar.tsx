"use client";
import { FloatingNav } from "../../components/ui/floatingNavbar"
import { HomeIcon,BrainCircuitIcon,Twitter} from "lucide-react";

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "intro-section",
      icon: <HomeIcon className="h-4 w-4 text-white hover:text-neutral-300"/>,
    },
    {
      name: "Features",
      link: "feature-section",
      icon: <BrainCircuitIcon className="h-4 w-4 text-white hover:text-neutral-300" />,
    },
    {
      name: "Contact",
      link: "contact-section",
      icon: (
        <Twitter className="h-4 w-4 text-white hover:text-neutral-300" />
      ),
    },
  ];
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}

export default Navbar
