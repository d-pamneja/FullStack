// Importing the moongoose 
import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({ // User Schema, which in a way defines the entires in a that collection. This will have both users and admin
  name: String,
  email: {type: String, unique: true},
  password: String,
  type : String
});

const Course = new Schema({ // Course Schema, which in a way defines the entires in a that collection (courses). Only an admin can add, update or delete documents from here. Users will only have read access
    adminId: ObjectId,
    title: String,
    description : String,
    price : Number,
    imgUrl : String
});

const Purchases = new Schema({ // Purchases Schema, which in a way defines the entires in a that collection (purchases). Users can make entries here only. This is basically a mapping table i.e. this does not store any information about the purchases, but rather maps the courses id and their creators admin id purchased by the respective user ids.
    courseId: {type: ObjectId, unique: true}, 
    userId: ObjectId,
    adminId : ObjectId
});

const UserModel = mongoose.model('users', User);
const CourseModel = mongoose.model('courses', Course);
const PurchasesModel = mongoose.model('purchases',Purchases)

export { UserModel, CourseModel, PurchasesModel };

