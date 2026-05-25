import { Schema, model, Document } from 'mongoose';
import { TaskDocument } from './task.interface';



const TaskSchema = new Schema<TaskDocument>(
    {
        sprint_id: { type: Schema.Types.ObjectId,ref: "Sprint",required: true },
        project_id: { type: Schema.Types.ObjectId, ref: "Project",required: true },

        title: { type: String, required: true, trim: true },
        description: { type: String, default: null },

        status: {
            type: String,
            enum: ['todo', 'in_progress', 'in_review', 'completed'],
            default: 'todo',
        },

        priority: {
            type: String,
            enum: ['low', 'medium', 'high', 'urgent'],
            default: 'medium',
        },

        assigned_to: { type: Schema.Types.ObjectId, ref:"User1", default: null },

        estimated_hours: { type: Number, default: null },
        spent_hours: { type: Number, default: 0 },

        created_by: {type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true }
);

export const TaskModel = model<TaskDocument>('Task', TaskSchema);