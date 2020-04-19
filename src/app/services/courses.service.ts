import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
    constructor(
        private db: AngularFirestore
    ) { }

    loadAllCourses() {
        return this.db.collection('courses').snapshotChanges().pipe(
            map(snaps => {
                return snaps.map(snap => {
                    return <Course> {
                        id: snap.payload.doc.id,
                        ...snap.payload.doc.data() as Course
                    };
                });
            }),
            first()
        );
    }
}
