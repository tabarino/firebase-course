import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;
    pictureUrl$: Observable<string>;

    constructor(
        private angularFireAuth: AngularFireAuth
    ) { }

    ngOnInit() {
        // The command !!user will transform the user variable in a boolean
        this.isLoggedIn$ = this.angularFireAuth.authState.pipe(map(user => !!user));
        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
        this.pictureUrl$ = this.angularFireAuth.authState.pipe(
            map(user => user ? user.photoURL : null)
        );
    }

    logout() {
        this.angularFireAuth.auth.signOut();
    }
}
