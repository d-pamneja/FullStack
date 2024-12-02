import {mutation} from "./_generated/server"
import {v} from "convex/values"

export const createDocument = mutation(
    {
        args : {
            title : v.string(),
            type : v.string(),
            text : v.optional(v.string())
        },
        handler : async (ctx,args) => {
            const newDocument = await ctx.db.insert("documents",{title : args.title, type : args.type, text:args.text})
            return newDocument
        }
    }
)