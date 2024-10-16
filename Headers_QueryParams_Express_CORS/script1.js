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
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1") // Since the fetch function returns a promise, we will await on it
    const data = await response.json() // We need to await and convert this data into json (this is also an await function fulfilling a promise)
    addTweet(data)
}


getTweet()
