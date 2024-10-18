async function login(){
    const username = document.getElementById("username-login").value
    const password = document.getElementById("password-login").value

    // const response = await axios.post('http://localhost:3000/login',{
    //     "id" : username,
    //     "password" : password
    // },
    // headers = {
    //     "authorization" : token
    // })

}

async function signUp(){
    const username = document.getElementById("username-sign-up").value
    const password = document.getElementById("password-sign-up").value

    const response = await axios.post('http://localhost:3000/sign-up',{
        "id" : username,
        "password" : password
    }).then(function(response){
        return alert(response.data.message)
    }).catch(function(err){
        if(err.status===400){
            const errorBody = err.response.data
            const validationError = errorBody.details
            if(validationError){
                const emailError = validationError[0].validation
                if(emailError){
                    return alert(validationError[0].message)
                }
                else{
                    return alert("Password " + validationError[0].message)
                }
            }
            const backendError = errorBody.message
            if(backendError){
                return alert(backendError)
            }
        }
    })

    // Reset after request to backend sent
    document.getElementById("username-sign-up").value = ""
    document.getElementById("password-sign-up").value = ""

}