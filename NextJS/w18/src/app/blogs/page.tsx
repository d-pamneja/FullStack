
import axios from "axios";

async function getBlogs() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/")
    return response.data;
}

export default async function Blogs() {

    const blogs = await getBlogs();

    return <div>
        {blogs.map((blog: ITodo) => <Todo title={blog.title} completed={blog.completed} />)}
    </div>
}

interface ITodo {
    title: string;
    completed: boolean;
}

function Todo({title, completed}: ITodo) {
    return <div className="mx-20 my-20">
        <h1>{title}</h1> :  <h2>{completed ? "done!" : "not done"}</h2>
    </div>
}