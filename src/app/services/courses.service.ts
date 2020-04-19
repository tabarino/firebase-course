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
        return this.db.collection(
            'courses', ref => ref.orderBy('seqNo')
            // 'courses', ref => ref.where('seqNo', '==', 0)
            // 'courses', ref => ref.where('seqNo', '>', 0).where('seqNo', '<=', 5)
            // 'courses', ref => ref.orderBy('seqNo').startAfter(0).endAt(5)
            // 'courses', ref => ref.where('categories', 'array-contains', 'BEGINNER')
        ).snapshotChanges().pipe(
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
