import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title: string = 'Login';
  loginForm: FormGroup;
  btnTitle: string = 'Login';
  hide: string = 'password';
  btnRegisterTitle:string = 'Register';
  invalidUser: boolean = false;
  invalidUserErrorMessage: string = 'Please enter valid username and password';
  validation_messages = {
   'userName': [
    { type: 'required', message: 'Please enter a valid user name' }
  ]
 };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required ],
      password: ['', [Validators.required, Validators.min(3)]]
    });
  }

  //For validte user
  onSubmit( value ){
    this.invalidUser = false;
    this.firebaseService.validateUser().subscribe(result => {
      let user = <any>{};
      result.map((userData)=>{
        user = userData.payload.doc.data();
        if (user.userName === value.userName && user.password === value.password) {
          this.firebaseService.loggedUser = user;
          this.router.navigate(['/home']);
        }
      });
      this.invalidUser = true;
    })
  }

   //For Create user
   createNewUser( ){
    this.router.navigate(['/new-user']);
  }
}
