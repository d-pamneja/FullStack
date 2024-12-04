import {mutation} from "./_generated/server"
import {v} from "convex/values"

export const createDocument = mutation(
    {
        args : {
            userID : v.string(),
            title : v.string(),
            type : v.string(),
            key : v.string(),
            date : v.optional(v.number()),
        },
        handler : async (ctx,args) => {
            const newDocument = await ctx.db.insert("documents",{userID : args.userID, title : args.title, type : args.type, key : args.key, date : Date.now()})
            return newDocument
        }
    }
)
