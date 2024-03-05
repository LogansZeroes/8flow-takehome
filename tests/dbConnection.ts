import mongoose from "mongoose";

export async function disconnectDBForTesting() {
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.log("DB disconnect error", error);
    }
}
