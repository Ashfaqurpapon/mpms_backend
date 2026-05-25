import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

import sendResponse from "../../utils/sendResponse";
import { SprintServices } from "./sprint.service";
import httpStatus from "http-status";

const createSprint = catchAsync(async (req: Request, res: Response) => {
    console.log("sprint", req.body);

    const sprint = await SprintServices.createSprintIntoDB(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'sprint created successfully',
        data: sprint,
    });
});


const getAllSprints = catchAsync(async (req: Request, res: Response) => {
    const { page, limit, projectId } =
        req.query;

    const sprints = await SprintServices.getAllSprints({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        projectId: projectId ? String(projectId) : undefined,

    });


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Sprints retrieved successfully',
        data: sprints,
    });
});

const getSingleSprint = catchAsync(async (req: Request, res: Response) => {
    const { sprintId } = req.params;


    const result =
        await SprintServices.getSingleSprint(sprintId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sprint is retrieved Succesfully',
        data: result,
    });
});
export const SprintControllers = {
    getAllSprints,
    getSingleSprint,
    createSprint,

};