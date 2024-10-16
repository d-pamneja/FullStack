function addTweet(tweet){
    const title = document.createElement("h4")
    title.innerHTML = tweet.id + ". " + tweet.title

    const body = document.createElement("p")
    body.innerHTML = tweet.body

    const posts = document.getElementById("posts")
    posts.appendChild(title)
    posts.appendChild(body)
    return;
}

async function getTweet(){
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1") // We can use the external library of axios to make this work, which has a easier syntax as compared to script1 which uses fetch
    addTweet(response.data)
}


getTweet()
