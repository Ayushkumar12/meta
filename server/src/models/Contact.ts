import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
    name: string;
    email: string;
    company?: string;
    service?: string;
    budget?: string;
    message: string;
    read: boolean;
    replied: boolean;
    createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        company: { type: String, trim: true },
        service: { type: String, trim: true },
        budget: { type: String },
        message: { type: String, required: true },
        read: { type: Boolean, default: false },
        replied: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Contact = mongoose.model<IContact>("Contact", ContactSchema);
