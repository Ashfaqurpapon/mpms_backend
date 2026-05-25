import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { Request, Response } from 'express';
import { ProjectServices } from './project.services';


const getAllProjects = catchAsync(async (req: Request, res: Response) => {
    const { page, limit } =
        req.query;

    const projects = await ProjectServices.getAllProjects({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
   
    });


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Projects retrieved successfully',
        data: projects,
    });
});


const getMyProjects = catchAsync(async (req: Request, res: Response) => {
    const { email } =
        req.query;
   
    
    const projects = await ProjectServices.getMyProjects(email as string);


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: ' MY Projects retrieved successfully',
        data: projects,
    });
});



const createProject = catchAsync(async (req: Request, res: Response) => {
    const project = await ProjectServices.createProjectIntoDB(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Project created successfully',
        data: project,
    });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
    const { projectId } = req.params;

  
    const result =
        await ProjectServices.getSingleProject(projectId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Project is retrieved Succesfully',
        data: result,
    });
});


export const ProjectControllers = {
    getAllProjects,
    getSingleProject,
    createProject,
    getMyProjects
    
}