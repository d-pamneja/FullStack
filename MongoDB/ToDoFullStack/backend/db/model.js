// Importing the moongoose 
import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({ // User Schema, which in a way defines the entires in a that collection (users)
  name: String,
  email: {type: String, unique: true},
  password: String
});

const Todo = new Schema({ // ToDo Schema, which in a way defines the entires in a that collection (todos)
    userId: ObjectId,
    id : Number,
    title: String,
    done: Boolean
});

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('toDos', Todo);

export { UserModel, TodoModel };

