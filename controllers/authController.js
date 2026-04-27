import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Email ya Password galat hai!" });
        }

        
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" } 
        );

        res.status(200).json({
            message: "Login Successful",
            token: token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};



export const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // URL se ID uthayenge (e.g., /update/123)
        const dataToUpdate = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, dataToUpdate, {
            new: true, // Naya updated document return karega
            runValidators: true // Model ke rules (like email validation) check karega
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User nahi mila!" });
        }

        res.status(200).json({
            message: "Profile update ho gayi hai",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};






export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User pehle se hi mojud nahi hai ya delete ho chuka hai" });
        }

        res.status(200).json({ message: "Account successfully delete kar diya gaya hai" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};