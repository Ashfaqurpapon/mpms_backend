import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TaskServices } from "./task.service";


const createTask = catchAsync(async (req: Request, res: Response) => {
    const project = await TaskServices.createTaskIntoDB(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Task created successfully',
        data: project,
    });
});


const getAllTask = catchAsync(async (req: Request, res: Response) => {
    // const { sprintId } = req.params;
    const { page, limit,sprint_id } =
        req.query;

    const tasks = await TaskServices.getAllTasks({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
         sprint_id: sprint_id ? String(sprint_id) : undefined,
     
    });

     sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Task created successfully',
        data: tasks,
    });
    
});

export const TaskController = {
    createTask,
    getAllTask
    
  
};