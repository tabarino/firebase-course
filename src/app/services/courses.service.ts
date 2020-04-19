import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Course } from '../model/course';
import { convertSnaps } from './db-util';
import { Observable } from 'rxjs';

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

            // FirebaseError: "Invalid query. All where filters with an inequality (<, <=, >, or >=) must be on the same field.
            // But you have inequality filters on 'seqNo' and 'lessonsCount'
            // Firestore doesn't allow this type of queries because of performance issues
            // 'courses', ref => ref.where('seqNo', '>=', 5).where('lessonsCount', '>', 5)

            // Firebase create an index for each field in the collection
            // In this case when you need to search by 2 or more different fields
            // Firebase will retrieve an error and you have to go and create a composite index
            // to perform the query.
            // Every query that runs in Firestore needs to have an index!!!
            // 'courses', ref => ref.where('seqNo', '==', 5).where('lessonsCount', '>', 5)

            // In this case we also have to create a new index, because the equality is in the lessonsCount now
            // For both cases Firestore add an error in the console with the link to create the index
            // 'courses', ref => ref.where('seqNo', '>=', 5).where('lessonsCount', '==', 8)
        ).snapshotChanges().pipe(
            map(snaps => convertSnaps<Course>(snaps)),
            first()
        );
    }

    findCourseByUrl(courseUrl: string): Observable<Course> {
        return this.db.collection(
            'courses', ref => ref.where('url', '==', courseUrl)
        ).snapshotChanges().pipe(
            map(snaps => {
                const courses = convertSnaps<Course>(snaps);
                return courses.length === 1 ? courses[0] : undefined;
            }),
            first()
        );
    }
}
