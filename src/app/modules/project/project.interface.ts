import { Types } from 'mongoose';


export interface IProject {
  title: string;
  client: string;
  description?: string | null;

  start_date: Date;
  end_date?: Date | null;

  budget: number;

  thumbnail?: string | null;

  owner_id: Types.ObjectId;

  status: "planned" | "active" | "completed" | "archived";
}

export interface IGetProjectsQuery {
  page: number;
  limit: number;
  
}