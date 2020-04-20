import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    constructor() { }

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
        // There is a limit of writes using the batch - 500 operations at the same time
        // If you have more than that you have to split the batches
        // const firebaseCourseRef = this.db.doc('/courses/IkO009NXSs0USMiH8L6e').ref;
        // const ngrxCourseRef = this.db.doc('/courses/LM85e3KgxuZ8n8XZMbWr').ref;

        // const batch = this.db.firestore.batch();
        // batch.update(firebaseCourseRef, { titles: { description: 'Serverless 123 Angular with Firebase Course' } });
        // batch.update(ngrxCourseRef, { titles: { description: 'NgRx 123 In Depth' } });
        // const batch$ = of(batch.commit());
    }
}
