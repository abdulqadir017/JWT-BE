import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config()


import authRoutes from "./routes/authRoutes.js"


const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("db connect ho gya"))
    .catch((err) => console.log("DB error:", err));


app.use('/api', authRoutes)

app.listen(process.env.PORT || 8500, () => {
    console.log(`Server running on port ${process.env.PORT || 8500}`);
});