import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { MemberServices } from "./member.service";
import sendResponse from "../../utils/sendResponse";

const createMember = catchAsync(async (req: Request, res: Response) => {
    const project = await MemberServices.createMemberIntoDB(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Member created successfully',
        data: project,
    });
});


const getAllProjectMembers = catchAsync(async (req: Request, res: Response) => {
    const { page, limit, projectId } =
        req.query;

    const projects = await MemberServices.getAllMembers({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        // sortBy: (sortBy as string) || 'createdAt',
        // sortOrder: (sortOrder as any) || 'desc',
        // search: (search as string) || '',
        projectId: projectId ? String(projectId) : undefined,
        // location: (location as string) || '',
        // type: type as string,
    });


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Members retrieved successfully',
        data: projects,
    });
});

export const MemberControllers = {

    createMember,
    getAllProjectMembers

};