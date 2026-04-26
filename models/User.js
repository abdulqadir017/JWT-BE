import mongoose from "mongoose";

const userSceema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
        
    },

    password: {
        type: String,
        required: true
    }
})

export default mongoose.model("user", userSceema)