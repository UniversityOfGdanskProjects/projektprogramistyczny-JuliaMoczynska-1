
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import userRouter from "./Routes/UserRouter.js";
import moviesRouter from "./Routes/MoviesRouter.js"
import { Server } from 'socket.io';
import http from 'http';
import mqtt from 'mqtt';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use("/api/users", userRouter)
app.use("/api/movies", moviesRouter);

app.use(errorHandler)

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

server.listen(PORT, ()  => {
    console.log(`Server running in http://localhost/${PORT}`);
});

const mqttClient = mqtt.connect(process.env.MQTT_BROKER);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
});

const roomsMap = new Map();

const defaultRooms = ['The Best Fandom', 'The Best Actor', 'The worst Actor'];

defaultRooms.forEach((roomName) => {
  roomsMap.set(roomName, { users: [] });
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.emit('rooms', getAvailableRooms());

  socket.on('send-message', ({ topic, message }) => {
    mqttClient.publish(topic, JSON.stringify(message));
    io.to(topic).emit('send-message', { topic, message });
  });

  socket.on('add-room', ({ roomName }) => {
    if (!roomsMap.has(roomName)) {
      roomsMap.set(roomName, { users: [] });
      io.emit('room-added', { roomName });
      io.emit('rooms', getAvailableRooms());
    }
  });

  socket.on('join-room', ({ roomName, username }) => {
    const room = roomsMap.get(roomName);
    if (room && room.users.includes(username)) {
      console.log('User already in the room');
    } else {
      socket.join(roomName);
      if (!roomsMap.has(roomName)) {
        roomsMap.set(roomName, { users: [] });
      }
      roomsMap.get(roomName).users.push(username);
      io.to(roomName).emit('user-joined', { roomName, username });
      io.emit('rooms', getAvailableRooms());
    }
  });

  socket.on('leave-room', ({ roomName, username }) => {
    socket.leave(roomName);
    const room = roomsMap.get(roomName);
    if (room) {
      room.users = room.users.filter((user) => user !== username);
      io.to(roomName).emit('user-left', { roomName, username });
      io.emit('rooms', getAvailableRooms());
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const getAvailableRooms = () => {
  const rooms = Array.from(roomsMap.keys()).map((roomName) => ({
    name: roomName,
    users: roomsMap.get(roomName).users,
  }));
  return rooms;
};
