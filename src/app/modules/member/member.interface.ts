

import { Types } from 'mongoose';

export interface IUser {
    _id: Types.ObjectId;
    name?: string;
    email: string;
    role: "admin" | "manager" | "member";
    createdAt?: Date;
}
export interface IMember {
    project_id: Types.ObjectId;
    user_id: Types.ObjectId | IUser;
    role: "admin" | "manager" | "member";
    joined_at: Date;
}

export interface IGetMembersQuery {
    page: number;
    limit: number;
    projectId?: string;

}