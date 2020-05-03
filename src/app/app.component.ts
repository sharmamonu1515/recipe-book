import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    ngOnInit() {
        // to initilize app during start
        firebase.initializeApp({
            apiKey: FIREBASE_API_KEY
            authDomain: FIREBASE_AUTH_DOMAIN
        });
    }

}
