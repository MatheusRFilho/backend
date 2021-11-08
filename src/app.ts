import 'express-async-errors';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { router } from './routes';

import { AppError } from './errors/AppError';

const app = express();

app.use(cors());

app.use(express.json());
app.use(router);

mongoose.connect(
  'mongodb://mongo:27017/burguer',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('connected to database');
  },
);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      stattus: 'Error',
      message: `Internal server error ${err.message}`,
    });
  },
);

export { app };
