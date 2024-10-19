function updateState(){
    var isLoggedIn = localStorage.getItem("isLoggedIn")==="true"
    if (!isLoggedIn) {
        // If the user is not logged in, hide the "about-me-section" and show the login section
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('about-me-section').style.display = 'none';
    } else {
        // If the user is logged in, hide the login section and show the "about-me-section"
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('about-me-section').style.display = 'block';
    }
}


async function login(){
    const username = document.getElementById("username-login").value
    const password = document.getElementById("password-login").value

    const response = await axios.post('http://localhost:3000/login',{
        "id" : username,
        "password" : password
    }).then(function(response){
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("token", response.data.token)
        updateState()
        me(username)
        return;
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
        else if(err.status===404){
            const errorBody = err.response.data
            return alert(errorBody.message)
        }
    })

    // Reset after request to backend sent
    document.getElementById("username-login").value = ""
    document.getElementById("password-login").value = ""

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
        else if(err.status===404){
            const errorBody = err.response.data
            return alert(errorBody.message)
        }
    })

    // Reset after request to backend sent
    document.getElementById("username-sign-up").value = ""
    document.getElementById("password-sign-up").value = ""

}

async function me(username){
    const response = await axios.get('http://localhost:3000/me',{
        headers : {
            'Authorization' : localStorage.getItem("token")
        },
        params : {
            'username' : username
        }
    }).then(function(res){
        const infoSection = document.getElementById("my-credentials")
        infoSection.innerText = res.data.message
        return;
    }).catch(function(err){
        if(err.status===401){
            const errorBody = err.response.data
            const backendError = errorBody.message
            if(backendError){
                return alert(backendError)
            }
        }
    })
}

async function logout(){
    const response = await axios.get('http://localhost:3000/logout',{
        headers : {
            'Authorization' : localStorage.getItem("token")
        }
    }).then(function(response){
        localStorage.setItem("isLoggedIn", "false")
        localStorage.removeItem("token");
        updateState()
        return;
    }).catch(function(err){
        if(err.status===401){
            const errorBody = err.response.data
            const backendError = errorBody.message
            if(backendError){
                return alert(backendError)
            }
        }
    })
}

updateState()

