import mongoose from "mongoose";
import "dotenv/config";
import { Admin } from "./src/models/Admin";

async function seedEditor() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);

        const exists = await Admin.findOne({ email: "editor@metacode.com" });
        if (exists) {
            console.log("Editor already exists!");
            process.exit(0);
        }

        const editor = await Admin.create({
            email: "editor@metacode.com",
            password: "Editor@1234",
            name: "Content Editor",
            role: "editor",
        });

        console.log("Seeded content editor account:", editor.email, " / Editor@1234");
        process.exit(0);
    } catch (err) {
        console.error("Error setting up editor account:", err);
        process.exit(1);
    }
}

seedEditor();
