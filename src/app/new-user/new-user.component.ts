import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  title: string = 'Create User';
  userForm: FormGroup;
  btnTitle: string = 'create';
  hide: string = 'password'
  validation_messages = {
   'name': [
     { type: 'required', message: ' Name is required.' }
   ],
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
    this.userForm = this.fb.group({
      name: ['', Validators.required ],
      userName: ['', Validators.required ],
      password: ['', [Validators.required, Validators.min(3)]]
    });
  }

  //For Create user
  onSubmit(value){
    this.firebaseService.createUser(value).then(res => {
      this.router.navigate(['/login']);
    });
  }

}
