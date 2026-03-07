import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin extends Document {
    email: string;
    password: string;
    name: string;
    role: "admin" | "editor";
    createdAt: Date;
    comparePassword(candidate: string): Promise<boolean>;
}

const AdminSchema = new Schema<IAdmin>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: { type: String, required: true, select: false },
        name: { type: String, required: true, default: "Admin" },
        role: { type: String, enum: ["admin", "editor"], default: "admin" },
    },
    { timestamps: true }
);

// Hash password before saving
AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Method to compare passwords
AdminSchema.methods.comparePassword = async function (candidate: string) {
    return bcrypt.compare(candidate, this.password);
};

export const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
