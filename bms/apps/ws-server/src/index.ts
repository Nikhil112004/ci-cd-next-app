import path from "path";
import { config as loadEnv } from "dotenv";
import { WebSocketServer } from "ws";

loadEnv({ path: path.resolve(__dirname, "../../../packages/prisma/.env") });
const { client } = require("@repo/db/client");

const server = new WebSocketServer({ port :3001 });

// ✅ async/await sahi se lagao
server.on("connection", async (socket) => {
    try {
        const user = await client.user.create({
            data: {
                username: Math.random().toString(),
                password: Math.random().toString()
            }
        });
        console.log("User created:", user);
        socket.send("Hi there you are connected to the server");
    } catch (e) {
        console.error("DB Error:", e);
        socket.send("Error: " + String(e));
    }
})