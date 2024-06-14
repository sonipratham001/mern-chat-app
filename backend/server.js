import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';


import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./soket/soket.js";

const PORT = process.env.PORT || 5001;

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


// app.get("/", (req,res)=> {
//     // route route http://localhost:5001/
//     res.send("Hello World!!");
// });


server.listen(PORT, () => {
    
    connectToMongoDB();
    console.log(`Server running on port port ${PORT}`)

});
