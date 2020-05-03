import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

    onSignUp(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        console.log(email);
        console.log(password);
        this.authService.signupUser(email, password);
    }
    
}
