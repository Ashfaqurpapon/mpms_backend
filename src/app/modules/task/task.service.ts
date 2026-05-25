import mongoose from "mongoose";
import { Project } from "../project/project.model";
import { IGetTasksQuery, TaskDocument } from "./task.interface";

import { TaskModel } from "./task.model";
import { Sprint } from "../sprint/sprint.model";
import { User } from "../userNew/user.model";

const createTaskIntoDB = async (
    payLoad: any
): Promise<TaskDocument> => {

    const taskData = payLoad.task;
    if (!mongoose.Types.ObjectId.isValid(taskData.sprint_id)) {
        throw new Error('Invalid Sprint ID');
    }
    const sprintExists = await Sprint.findById(taskData.sprint_id);
    if (!sprintExists) {
        throw new Error('sprint not found');
    }

    if (!mongoose.Types.ObjectId.isValid(taskData.project_id)) {
        throw new Error('Invalid Project ID');
    }
    const porjectExists = await Project.findById(taskData.project_id);
    if (!porjectExists) {
        throw new Error('project not found');
    }


    const task = new TaskModel(taskData);

    return await task.save();
};
const getAllTasks = async (query: IGetTasksQuery) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
   const sprint_id = String(query.sprint_id) || null

    const skip = (page - 1) * limit;

    // Filter object 
    const filter: Record<string, any> = {};

    if (query.sprint_id) {
        filter.sprint_id = query.sprint_id;
    }

    const tasks = await TaskModel.find(filter)
        .populate({
            path: "assigned_to",
            select: "name email role createdAt",
        })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await TaskModel.countDocuments(filter);
    return {
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
        data: tasks,
    };
};

const getAllTask = async (query: IGetTasksQuery) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter: Record<string, any> = {};
    const tasks = await TaskModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await TaskModel.countDocuments(filter);

    return {
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
        data: tasks,
    };
};



export const TaskServices = {
    createTaskIntoDB,
     getAllTasks
    //   deleteProductFromDB,
    // getAllProjects,
    //   getAllProductsByAdmin,
    //   getAllLeafCategoryProducts,
    // getSingleProject
    //    getSingleProductCustomerByProductID,
    //   updateProductInfoInDB,
};
