import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { Server } from 'socket.io';
import userRouter from "./Routes/UserRouter.js";
import moviesRouter from "./Routes/MoviesRouter.js"
import cookies from 'react-cookies';
import http from 'http';
import mqtt from 'mqtt';
import fs from 'fs';

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

const mqttClient = mqtt.connect(process.env.MQTT_BROKER);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
});

const defaultRooms = ['The Best Fandom', 'The Best Actor', 'The worst Actor'];
const feedbackQuestions = [
  { id: 1, text: 'How would you rate the overall design of our website?' },
  { id: 2, text: 'Did you find the navigation on our website intuitive?' },
  { id: 3, text: 'What features would you like to see added to our website?' },
];

const roomsMap = new Map();

defaultRooms.forEach((roomName) => {
  roomsMap.set(roomName, { users: [] });
});

export const SocketConnection = (socket) => {
    console.log('A user connected');
  
    socket.emit('rooms', getAvailableRooms());
    socket.emit('feedback-questions', feedbackQuestions);
  
    socket.on('submit-feedback', ({ answers, userEmail }) => {
        console.log('Received feedback:', answers, 'from user:', userEmail);

        const userFeedbackKey = `feedback_${userEmail}`;
        const existingFeedback = cookies.load(userFeedbackKey);
    
        // const feedbackData = fs.readFileSync('feedback.log', 'utf8');
        // const existingFeedback = feedbackData.split('\n').some((line) => {
        // try {
        //     const feedback = JSON.parse(line);
        //     return feedback.userEmail === userEmail;
        // } catch (error) {
        //     return false;
        // }
        // });
    
        // if (existingFeedback) {
        // console.log('User already submitted feedback.');
        // socket.emit('feedback-submitted', { success: false, message: 'User already submitted feedback.' });
        // return;
        // }

        if (existingFeedback) {
          console.log('User already submitted feedback.');
          socket.emit('feedback-submitted', { success: false, message: 'User already submitted feedback.' });
          return;
        }

        cookies.save(userFeedbackKey, answers, { maxAge: 24 * 60 * 60 });
        fs.appendFileSync('feedback.log', JSON.stringify({ ...answers, userEmail }) + '\n');

        socket.emit('feedback-submitted', { success: true });
    });
  
  
  
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
        console.log(roomsMap)
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
}

const getAvailableRooms = () => {
    const rooms = Array.from(roomsMap.keys()).map((roomName) => ({
      name: roomName,
      users: roomsMap.get(roomName).users,
    }));
    return rooms;
};

io.on('connection', SocketConnection);

server.listen(PORT, ()  => {
  console.log(`Server running in http://localhost/${PORT}`);
});

