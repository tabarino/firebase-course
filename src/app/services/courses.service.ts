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
            // 'courses', ref => ref.orderBy('seqNo')
            // 'courses', ref => ref.where('seqNo', '==', 0)
            // 'courses', ref => ref.where('seqNo', '>', 0).where('seqNo', '<=', 5)
            // 'courses', ref => ref.orderBy('seqNo').startAfter(0).endAt(5)
            // 'courses', ref => ref.where('categories', 'array-contains', 'BEGINNER')

            // Firebase create an index for each field in the collection
            // In this case when you need to search by 2 or more different fields
            // Firebase will retrieve an error and you have to go and create a composite index
            // to perform the query.
            // Every query that runs in Firestore needs to have an index!!!
            'courses', ref => ref.where('seqNo', '==', 5).where('lessonsCount', '>', 5)
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
