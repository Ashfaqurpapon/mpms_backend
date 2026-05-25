import mongoose from "mongoose";
import { IGetSprintsQuery, ISprint } from "./sprint.interface";
import { Sprint } from "./sprint.model";
import { Project } from "../project/project.model";
import { IGetProjectsQuery } from "../project/project.interface";


const createSprintIntoDB = async (
    payLoad: ISprint
): Promise<ISprint> => {

    
    if (!mongoose.Types.ObjectId.isValid(payLoad.project_id)) {
        throw new Error('Invalid project id format');
    }

    const projectExists = await Project.findById(payLoad.project_id);

    if (!projectExists) {
        throw new Error('Project not found');
    }

    
    const lastSprint = await Sprint
        .findOne({ project_id: payLoad.project_id })
        .sort({ sprint_number: -1 });

    
    const sprint_number = lastSprint
        ? lastSprint.sprint_number + 1
        : 1;

    
    const sprint = new Sprint({
        ...payLoad,
        sprint_number,
    });

    return await sprint.save();
};

const getAllSprints = async (query: IGetSprintsQuery) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const projectId = String(query.projectId) || null

    const skip = (page - 1) * limit; 
    const filter: Record<string, any> = {};
    if (query.projectId) {
        filter.project_id = query.projectId;
    }

    const sprints = await Sprint.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    // Total count
    const total = await Sprint.countDocuments(filter);

    return {
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
        data: sprints ,
    };
};

const getSingleSprint = async (id: string) => {
    const result = Sprint.findById(id);
    // console.log("reult",result);

    return result;
};
export const SprintServices = {
    createSprintIntoDB,
    getAllSprints,
    getSingleSprint
  
};

