import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express()
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"*",
        methods:["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.port || 3000;

app.get("/health", (req, res) => {
    res.json({ status: "AutoQA Orchestrator is running! 🚀" });
});

io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    socket.on("disconnected", () => {
        console.log(`❌ Client disconnected: ${socket.id}`);
    });
});

server.listen(PORT, ()=>{
    console.log(`🤖 AutoQA Backend listening on port ${PORT}`);
})