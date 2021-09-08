"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const PORT = process.env.PORT || 5001;
const cors = require("cors");

app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const { addUser, removeUser, getUser, getUsersIntitle } = require("./users");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origins: ["*"],
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,GET",
        "Access-Control-Allow-Credentials": true,
      });
      res.end();
    },
  },
});

const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const apiElementRouter = require("./routes/api.route");
const postRouter = require("./routes/posts.route");

const errorHandler = require("./src/error-handlers/500");
const notFound = require("./src/error-handlers/500");
const authRoutes = require("./src/auth/routes");

//routes to use.
app.use(authRoutes);
app.use("/user", userRouter);
app.use("/apiElement", apiElementRouter);
app.use("/bids", productRouter);
app.use("/posts", postRouter);
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

let counters = 0;
let runTimer = true;
// socket connection

io.on("connection", (socket) => {
  socket.on("join", ({ username, title }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, title });
    console.log("user", user);

    if (error) return callback(error);

    socket.join(user.title);

    callback();
  });

  socket.on("message", (message, callback) => {
    const user = getUser(socket.id);
    console.log("message sent", user);
    socket.to(user.title).emit("message", { message, username: user.username });
    console.log("message", message);
  });

  socket.on("print", (data) => {
    const user = getUser(socket.id);
    socket.to(user.title).emit("print", data);
    console.log("print sent", user);
  });

  socket.emit("click_count", counters); // first time??

  //when user click the button
  socket.on("clicked", function () {
    const user = getUser(socket.id);
    console.log("user increase", user);

    counters += 50; //increments global click count
    io.to(user.title).emit("click_count", counters); //send to all users new counter value

    if (runTimer) {
      runTimer = false;
      let timer = 15;
      let WinnerCountdown = setInterval(function () {
        io.sockets.to(user.title).emit("counter", timer);
        timer--;
        if (timer === 0) {
          runTimer = true;
          io.sockets.to(user.title).emit("counter", "Times UP");
          clearInterval(WinnerCountdown);
        }
      }, 1000);
    }
  });

  socket.on("clicked1", function () {
    const user = getUser(socket.id);
    counters += 100; //increments global click count
    io.to(user.title).emit("click_count", counters); //send to all users new counter value

    if (runTimer) {
      runTimer = false;
      let timer = 15;
      let WinnerCountdown = setInterval(function () {
        io.sockets.to(user.title).emit("counter", timer);
        timer--;
        if (timer === 0) {
          runTimer = true;
          io.sockets.to(user.title).emit("counter", "Times UP");
          clearInterval(WinnerCountdown);
        }
      }, 1000);
    }
  });
  socket.on("clicked2", function () {
    const user = getUser(socket.id);
    counters += 200; //increments global click count
    io.to(user.title).emit("click_count", counters); //send to all users new counter value

    if (runTimer) {
      runTimer = false;
      let timer = 15;
      let WinnerCountdown = setInterval(function () {
        io.sockets.to(user.title).emit("counter", timer);
        timer--;
        if (timer === 0) {
          runTimer = true;
          io.sockets.to(user.title).emit("counter", "Times UP");
          clearInterval(WinnerCountdown);
        }
      }, 1000);
    }
  });

  counters = 0;

  socket.on("winner", function (winner) {
    const user = getUser(socket.id);
    io.to(user.title).emit("resWinner", winner);
    console.log("responseWinner", winner);
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.title).emit("message", {
        user: "admin",
        text: `${user.name} has left!`,
      });
      io.to(user.title).emit("titleData", {
        title: user.title,
        users: getUsersIntitle(user.title),
      });
    }
  });
});

app.use(notFound);
app.use("*", errorHandler);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`up and running on ${PORT}`));
  })
  .catch((e) => {
    console.error("CONNECTION ERROR", e.message);
  });
