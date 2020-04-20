import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    constructor(private db: AngularFirestore) { }

    ngOnInit() {
        // This Observable returns all data from database everytime a data changes
        // this.db.collection('courses').valueChanges().subscribe(val => {
        //     console.log(val);
        // });

        // This Observable returns all data from database everytime a data changes
        // snapshotChanges give you back the current state of the collection
        // this.db.collection('courses').snapshotChanges().subscribe(snaps => {
        //     const courses: Course[] = snaps.map(snap => {
        //         return <Course> {
        //             id: snap.payload.doc.id,
        //             ...snap.payload.doc.data()
        //         };
        //     });

        //     console.log(courses);
        // });

        // This Observable returns from the database only the data changed
        // stateChanges give you back only the records changed in the collection
        // this.db.collection('courses').stateChanges().subscribe(snaps => {
        //     const courses: Course[] = snaps.map(snap => {
        //         return <Course> {
        //             id: snap.payload.doc.id,
        //             ...snap.payload.doc.data() as Course
        //         };
        //     });

        //     console.log(courses);
        // });

        // Firestore Batched Writes
        // Use it if you are going to write data in more than one doc in the database
        // There is a limit of writes using the batch - 500 operations at the same time
        // If you have more than that you have to split the batches
        // const firebaseCourseRef = this.db.doc('/courses/IkO009NXSs0USMiH8L6e').ref;
        // const ngrxCourseRef = this.db.doc('/courses/LM85e3KgxuZ8n8XZMbWr').ref;

        // const batch = this.db.firestore.batch();
        // batch.update(firebaseCourseRef, { titles: { description: 'Serverless 123 Angular with Firebase Course' } });
        // batch.update(ngrxCourseRef, { titles: { description: 'NgRx 123 In Depth' } });
        // const batch$ = of(batch.commit());

        // Run Transaction
        // Use it if you are going to read and write data in one or more than one doc in the database
        // this.runTransaction();

        // Document References
        // const courseRef = this.db.doc('/courses/IkO009NXSs0USMiH8L6e').snapshotChanges().subscribe(
        //     snap => {
        //         const course: any = snap.payload.data();
        //         console.log(course.relatedCourseRef);
        //     }
        // );

        // const ref = this.db.doc('courses/LM85e3KgxuZ8n8XZMbWr').snapshotChanges().subscribe(
        //     snap => {
        //         console.log(snap.payload.ref);
        //     }
        // );
    }

    // async runTransaction() {
    //     const newCounter = await this.db.firestore.runTransaction(async transaction => {
    //         console.log('Run Transaction ...');

    //         const courseRef = this.db.doc('/courses/IkO009NXSs0USMiH8L6e').ref;
    //         const snap = await transaction.get(courseRef);
    //         const course = <Course> snap.data();
    //         const lessonsCount = course.lessonsCount + 1;
    //         transaction.update(courseRef, { lessonsCount });

    //         return lessonsCount;
    //     });

    //     console.log('New Lessons Count: ' + newCounter);
    // }
}
