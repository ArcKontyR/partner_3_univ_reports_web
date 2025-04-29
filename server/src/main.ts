// server/src/main.ts

import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import * as http from 'http'
import { studentRouter } from './routers/StudentRouter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/student', studentRouter)

const port = process.env.PORT || 3001;

app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Hello from the server!' });
});



http.createServer(app).listen(port, () => {
  console.info(`Server started at: http://localhost:${port}`);
});