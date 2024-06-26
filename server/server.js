import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { Server } from 'socket.io';
import userRouter from "./Routes/UserRouter.js";
import moviesRouter from "./Routes/MoviesRouter.js"
import http from 'http';
import mqtt from 'mqtt';
import { keycloak, memoryStore } from "./services/keycloak.js";
import session from 'express-session';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

app.use(keycloak.middleware({ logout: '/logout' }))


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use("/api/users", userRouter)
app.use("/api/movies", moviesRouter);

app.use(errorHandler)

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

const mqttClient = mqtt.connect(process.env.MQTT_BROKER);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
});

server.listen(PORT, ()  => {
  console.log(`Server running in http://localhost/${PORT}`);
});

