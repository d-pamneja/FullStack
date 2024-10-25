// In progress

// Importing the moongoose 
import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({ // User Schema, which in a way defines the entires in a that collection (users)
  name: String,
  email: {type: String, unique: true},
  password: String,
  type : String
});

const Course = new Schema({ // Course Schema, which in a way defines the entires in a that collection (courses)
    userId: ObjectId,
    id : Number,
    title: String,
    description : String,
    modules : Array[String]
});

const CourseContent = new Schema({ // Course Content Schema, which in a way defines the entires in a that collection (courseContent)
    courseId: ObjectId,
    id : Number,
    title: String,
    done: Boolean
});

const UserModel = mongoose.model('users', User);
const CourseModel = mongoose.model('courses', Course);
const CourseContentModel = mongoose.model('courseContent',CourseContent)

export { UserModel, CourseModel };

