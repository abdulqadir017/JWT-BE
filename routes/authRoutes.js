import express from "express";
import { signup, login, updateUser, deleteUser } from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Public Routes (Inke liye token nahi chahiye)
router.post("/signup", signup);
router.post("/login", login);

// Private Routes (Inke liye Token hona zaroori hai)
// verifyToken pehle check karega ke user login hai ya nahi
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

router.get("/profile", verifyToken, (req, res) => {
    res.json({
        message: "Ye aapka private data hai",
        user: req.user
    });
});

export default router;