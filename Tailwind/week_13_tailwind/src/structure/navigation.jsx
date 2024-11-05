import { Age } from "../pages/age-verification";
import { Email } from "../pages/email";
import { VerifyEmail } from "../pages/email-verification";

export const nav = [
    {
        path : "/", name : "Landing", element : <Age/>
    },
    {
        path : "/email", name : "Email", element : <Email/>
    },
    {
        path : "/verify-email", name :  "Email Verification", element : <VerifyEmail/>
    }
]