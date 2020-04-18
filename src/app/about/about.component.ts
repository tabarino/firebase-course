import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAaUzMZFKfmkQtGyrvYEgAQNWo3UfsftSI',
  authDomain: 'fir-course-f8e49.firebaseapp.com',
  databaseURL: 'https://fir-course-f8e49.firebaseio.com',
  projectId: 'fir-course-f8e49',
  storageBucket: 'fir-course-f8e49.appspot.com',
  messagingSenderId: '898180964900',
  appId: '1:898180964900:web:3dd7a5d0105d6a240baeb1',
  measurementId: 'G-YKYF7XRQFD'
};

firebase.initializeApp(config);

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };

db.settings(settings);

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    db.doc('courses/IkO009NXSs0USMiH8L6e').get().then(snap => {
      console.log(snap.data());
    });

  }

}
