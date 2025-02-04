import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorMiddleware } from './middlewares/errors';
import { BASE_API_PATH } from './constants';
import rootRouter from './routes/index';
import path from 'path';


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.json({
    limit: '16kb'
}))

app.use(express.urlencoded({extended: true, limit: '16kb'}))

// app.use(express.static("public"))

app.use(cookieParser())

app.use(BASE_API_PATH, rootRouter)

app.use(errorMiddleware)

export {app};