import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const User = new Schema({
    username : {type : String, unique : true},
    password : String
})

const Link = new Schema({
    hash : String,
    userID : {type : ObjectId, ref : 'User', required : true}
})

const Tag = new Schema({
    title : {type : String, required : true, unique : true}
})

const contentTypes = ['image', 'video', 'article', 'audio']

const Content = new Schema({
    link : String,
    type : {type : String, enum : contentTypes, required : true},
    title : String,
    tags : [{type : ObjectId, ref : 'Tag'}],
    userID : {type : ObjectId, ref : 'User', required : true}
})

const UserModel = mongoose.model('users', User)
const LinkModel = mongoose.model('links', Link)
const TagModel = mongoose.model('tags',Tag)
const ContentModel = mongoose.model('content',Content)

export { UserModel, LinkModel, TagModel, ContentModel};