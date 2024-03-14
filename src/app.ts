import { load } from 'dotenv-extended';
import express, { Request, Response } from 'express';
import session, { SessionOptions } from 'express-session';
import connectDB from './config/database.js';
import usersRoute from './api/users.js'
import postsRoute from './api/posts.js'
import { resolve, join } from 'path';

load();
connectDB()

const app = express()

const oneDay = 1000 * 60 * 60;
const expSession: SessionOptions = {
  secret: process.env.SESSION_SECRET || 'asjkcfb89343857qf4hvbt78237g5485fi9b5f893437485g7fb7',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: oneDay
  }
}

app.use(express.static('public'))
app.use(session(expSession))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.sendFile(join('public', 'index.html') ,);
})

app.use('/post', postsRoute)
app.use('/user', usersRoute)

export default app;
