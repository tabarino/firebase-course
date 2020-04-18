import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from '../model/course';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    constructor(
        private db: AngularFirestore
    ) { }

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
        //             ...snap.payload.doc.data()
        //         };
        //     });

        //     console.log(courses);
        // });
    }

}
