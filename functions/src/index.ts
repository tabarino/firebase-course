import * as functions from 'firebase-functions';
import * as express from 'express';
import { Course } from '../../src/app/model/course'
import { db } from './init';

const app = express();
const cors = require('cors');

app.use(cors({ origin: true }));

app.get('/courses', async (request, response) => {
    const snaps = await db.collection('courses').get();
    const courses: Course[] = [];
    snaps.forEach(snap => courses.push(snap.data()));

    response.status(200).json({ courses });
});

export const getCourses = functions.https.onRequest(app);
