import axios from "axios"


export const loginUser = async (
    username:string,
    password:string
)=>{
    const res = await axios.post("/user/login",{username, password});
    if(res.status != 200){
        throw new Error("Unable to Login.")
    }
    
    const data = await res.data;
    localStorage.setItem('userID',data.id)

    return data;
}

export const signUpUser = async (
    username:string,
    password:string
)=>{
    const res = await axios.post("/user/signup",{username, password});
    if(res.status != 201){
        throw new Error("Unable to Sign Up User.")
    }
    
    const data = await res.data;
    localStorage.setItem('userID',data.id)
    return data;
}

export const logoutUser = async () => {
    const res = await axios.get('/user/logout', {
      withCredentials: true,
    });
    
    if (res.status != 200) {
        throw new Error("Logout failed");;
    }

    const data = await res.data;
    localStorage.removeItem('userID')
    return data;

  };


export const checkAuthStatus = async () => {
    try{
        const res = await axios.get("/user/auth-status");
        if(res.status===403 || res.status===401){
            throw new Error("Error caught successfully")
        }
        const data = await res.data;
        return data;
    }
    catch(error){
        return null; 
    }
  };


export const fetchData = async () =>{
    try{
        const res = await axios.get("/content/viewContent")
        if(res.status===404 || res.status===500){
            throw new Error("Error caught successfully")
        }
        
        const data = await res.data
        return data
    }
    catch(error){
        return null
    }
}

export const getAllTags = async () =>{
    const res = await axios.get("/content/getTags")
    if(res.status != 200){
        throw new Error("Unable to fetch tags.")
    }

    const data = await res.data;
    return data;
}

export const viewContent = async ()=>{
    const res = await axios.get("/content/viewContent");
    if(res.status != 200){
        throw new Error("Unable to Add content.")
    }
    
    const data = await res.data;
    return data;
}

export const addContent = async (
    title : string,
    link : string,
    type : string,
    tags : Array<{value : string}>
)=>{
    const res = await axios.post("/content/addContent",{title, link,type,tags});
    if(res.status != 201){
        throw new Error("Unable to Add content.")
    }
    
    const data = await res.data;
    return data;
}