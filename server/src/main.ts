// server/src/main.ts

import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import fileUpload from 'express-fileupload';
import * as http from 'http'
import { studentRouter } from './routers/StudentRouter';
import { supervisorRouter } from './routers/SupervisorRouter';
import { practiceRouter } from './routers/PracticeRouter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  createParentPath: true
}))

app.use('/api/student', studentRouter)
app.use('/api/supervisor', supervisorRouter)
app.use('/api/practice', practiceRouter)

const port = process.env.PORT || 3001;

app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Hello from the server!' });
});



http.createServer(app).listen(port, () => {
  console.info(`Server started at: http://localhost:${port}`);
});