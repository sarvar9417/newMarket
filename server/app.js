const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { start } = require("./connectDB/db");
const { socketIO } = require("./socketio/socket");
const { routers } = require("./routers/routers");
const io = new Server(server, {
  cors: {
    origin: "*",
    method: ["*"],
  },
});

app.use(cors());

socketIO(io);

start(server).then(()=>{});

routers(app);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "./../frontend", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "./../frontend", "build", "index.html")
    );
  });
}
