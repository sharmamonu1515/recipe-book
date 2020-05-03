import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthService {

    constructor(private route: Router) {}

    token = null;

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                res => console.log(res)
            )
            .catch(
                e => console.log(e)
            );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                res => {
                    this.setToken();
                    this.route.navigate(['/']);
                }
            )
            .catch(
                err => console.log(err)
            );
    }

    getToken() {
        this.setToken();
        return this.token;
    }

    setToken() {
        firebase.auth().currentUser.getIdToken()
        .then(
            token => this.token = token 
        )
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }
}