import * as functions from 'firebase-functions';
import { db } from './init';

export const onAddLesson = functions.firestore.document(
    'courses/{courseId}/lessons/{lessonId}'
).onCreate(
    async (snap, context) => {
        // You can get the fields in this way
        // const courseId = context.params.courseId;

        console.log('Running onAddLesson trigger ...');

        courseTransaction(snap, course => {
            return { lessonsCount: course.lessonsCount + 1 };
        });
    }
);

export const onDeleteLesson = functions.firestore.document(
    'courses/{courseId}/lessons/{lessonId}'
).onDelete(
    async (snap, context) => {
        console.log('Running onDeleteLesson trigger ...');

        courseTransaction(snap, course => {
            return { lessonsCount: course.lessonsCount - 1 };
        });
    }
);

function courseTransaction(snap, callback: Function) {
    return db.runTransaction(async transaction => {
        const courseRef = snap.ref.parent.parent;
        const courseSnap = await transaction.get(courseRef);
        const course = courseSnap.data();
        const changes = callback(course);

        transaction.update(courseRef, changes);
    });
}
