
import { string } from "joi";
import { Schema, model, Document } from "mongoose";
import { ISprint } from "./sprint.interface";


const sprintSchema = new Schema<ISprint>(
  {
    name: {
      type: String,
      required: true
    },
    sprint_number: {
      type: Number
    },
    project_id: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    status: {
      type: String, enum: ['active', 'planning', 'completed'],
      default: 'active',
    },
    start_date:{type:String},
    end_date:{type:String}

    
  },
  { timestamps: true }
);

export const Sprint = model<ISprint>("Sprint", sprintSchema);
