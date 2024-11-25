import { Button } from "./button"
import { FcGoogle } from "react-icons/fc"; 
import { useMediaQuery } from "react-responsive";

  
export const GoogleSignInButton = () => {
  const isSmall = useMediaQuery({maxWidth : 639})
  const isMedium = useMediaQuery({minWidth: 640, maxWidth : 1023})

  const size = isSmall ? "sm" : isMedium ? "md" : "lg"

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  return (
    <div className="flex justify-center mb-8">
        <Button
            variant="outline"
            size={size}
            text="Google Login"
            startIcon={<FcGoogle />} 
            onClick={handleGoogleSignIn} 
        />
    </div>
  );
};

export default {GoogleSignInButton};
