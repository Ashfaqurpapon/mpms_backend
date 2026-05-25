
import { Schema, model, Document } from "mongoose";
import { IMember } from "./member.interface";
import { string } from "joi";
import { User } from "../userNew/user.model";


const memberSchema = new Schema<IMember>(
    {

        project_id: { type: Schema.Types.ObjectId, ref: "Project", required: true },
        user_id: { type: Schema.Types.ObjectId, ref: "User1", required: true },
        role: {
            type: String, enum: ['admin', 'manager', 'member'],
            default: 'member',
        },
        joined_at: {
            type: Date,
            default: Date.now
        }

    },
    { timestamps: true }
);

export const Member = model<IMember>("Member", memberSchema);
