const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();
const httpServer = require("http").Server(app);
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const chatMessageRouter = require("./routers/chatMessageRouter");
const { handleSocket } = require("./socket/handleSocket");
const pool = require("./config/db");
const { initializeTable } = require("./models/userModel");


pool.getConnection()
   .then(connection => {
      console.log("Connected to database");
      connection.release();
      // Initialize table after database connection
      return initializeTable();
   })
   .catch(err => {
      console.error("Database connection failed:", err.message);
   });


app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/message", chatMessageRouter);

const io = new Server(httpServer, {
   cors: {
      origin: "*",
   },
});
app.get("/", (req, res) => {
   res.send("Hello World!");
});

handleSocket(io);

httpServer.listen(3001, () => {
   console.log("Server is running on port 3001");
});