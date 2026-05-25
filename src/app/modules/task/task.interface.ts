
import { Types } from 'mongoose';

export interface TaskDocument extends Document {
    sprint_id: Types.ObjectId;
    project_id: Types.ObjectId;
    title: string;
    description: string | null;

    status: 'todo' | 'in_progress' | 'in_review' | 'completed';
    priority: 'low' | 'medium' | 'high' | 'urgent';

    assigned_to: Types.ObjectId;

    estimated_hours: number | null;
    spent_hours: number;

    created_by: Types.ObjectId;

    created_at: Date;
    updated_at: Date;
}

export interface IGetTasksQuery {
  page: number;
  limit: number;
  sprint_id?: string;
  
}