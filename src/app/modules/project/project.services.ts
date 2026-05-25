import mongoose, { Types } from 'mongoose';

import { IGetProjectsQuery, IProject } from './project.interface';
import { User } from '../userNew/user.model';
import { Project } from './project.model';
import { Member } from '../member/member.model';




const getAllProjects = async (query: IGetProjectsQuery) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};
    const projects = await Project.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await Project.countDocuments(filter);

    return {
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
        data: projects,
    };
};


const getSingleProject = async (id: string) => {
    const result = Project.findById(id);
    // console.log("reult",result);

    return result;
};

const createProjectIntoDB = async (payLoad: IProject): Promise<IProject> => {
    
    if (!mongoose.Types.ObjectId.isValid(payLoad.owner_id)) {
        throw new Error('Invalid categoryId format');
    }

    const userExists = await User.findById(payLoad.owner_id);
    if (!userExists) {
        throw new Error('user not found');
    }

    const project = new Project(payLoad);
    return await project.save();
};


export const getMyProjects = async (email: string) => {
    // Step 1: Get user by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    // Step 2: Get member records for this user
    const memberships = await Member.find({
        user_id: user._id,
    });

    if (!memberships.length) {
        return [];
    }

    // Step 3: Extract project IDs
    const projectIds = memberships.map((m) => m.project_id);

    // Step 4: Fetch projects
    const projects = await Project.find({
        _id: { $in: projectIds },
    });

    return {
        meta: {
            // total,
            // page,
            // limit,
            // totalPages: Math.ceil(total / limit),
        },
        data: projects,
    };
};

export const ProjectServices = {
    createProjectIntoDB,
    getAllProjects,
    getSingleProject,
    getMyProjects
   
};
