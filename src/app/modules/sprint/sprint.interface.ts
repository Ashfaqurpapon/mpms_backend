import { Types } from 'mongoose';

export interface ISprint {
  id: string;
  project_id: Types.ObjectId;
  name: string;
  sprint_number: number ;
  start_date: string | null;
  end_date: string | null;
  status: 'planning' | 'active' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface IGetSprintsQuery {
  page: number;
  limit: number;
 projectId?: string;
  
}