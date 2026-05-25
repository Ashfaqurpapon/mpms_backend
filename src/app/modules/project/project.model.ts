
import { Schema, model, Document } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true
    },
    client: {
      type: String,
    },
    description: {
      type: String
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
    },
    budget: {
      type: Number,
      min: 0,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    owner_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["planned", "active", "completed", "archived"],
      default: "planned",
    },

  },
  { timestamps: true }
);

export const Project = model<IProject>("Project", projectSchema);
