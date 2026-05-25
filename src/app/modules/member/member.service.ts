import mongoose from "mongoose";
import { IGetMembersQuery, IMember } from "./member.interface";
import { Project } from "../project/project.model";
import { User } from "../userNew/user.model";
import { Member } from "./member.model";

const createMemberIntoDB = async (payLoad: IMember): Promise<IMember> => {

    if (!mongoose.Types.ObjectId.isValid(payLoad.project_id)) {
        throw new Error('Invalid Project format');
    }
    const projectExists = await Project.findById(payLoad.project_id);
    if (!projectExists) {
        throw new Error('user not found');
    }

    if (!mongoose.Types.ObjectId.isValid(payLoad.user_id as any)) {
        throw new Error('Invalid User format');
    }
    const userExists = await User.findById(payLoad.user_id);
    if (!userExists) {
        throw new Error('user not found');
    }

    const member = new Member(payLoad);
    return await member.save();
};


const getAllMembers = async (query: IGetMembersQuery) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const projectId = String(query.projectId) || null

    const skip = (page - 1) * limit;

    
    const filter: Record<string,  any> = {};

  
    if (query.projectId) {
        filter.project_id = query.projectId;
    }


    // Fetch members
    const members = await Member.find(filter)
        .populate({
            path: "user_id",
            select: "name email role createdAt",
        })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });


    const total = await Member.countDocuments(filter);

    return {
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
        data: members,
    };
};




export const MemberServices = {
    createMemberIntoDB,
    getAllMembers
   
};
