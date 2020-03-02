import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-feedback',
  templateUrl: './new-feedback.component.html',
  styleUrls: ['./new-feedback.component.scss']
})
export class NewFeedbackComponent implements OnInit {
  title: string;
  projectForm: FormGroup;
  btnTitle: string;
  element:any = null;
  item: any = null;
  btnCancelTitle: string = 'Cancel'
  projectList: any = [
    {value: 'CPIP', viewValue: 'CPIP'},
    {value: 'Estimator', viewValue: 'Estimator'},
    {value: 'Mobile Diagnostics', viewValue: 'Mobile Diagnostics'},
    {value: 'Repair', viewValue: 'Repair'},
    {value: 'Photogrid', viewValue: 'Photogrid'},
    {value: 'Skills Matrix', viewValue: 'Skills'}
  ];
  validation_messages = {
   'empName': [
     { type: 'required', message: 'Employee Name is required.' }
   ]
 };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    if (this.firebaseService.project === null) {
      this.btnTitle = 'Submit';
      this.createForm();
    } else {
      this.btnTitle = 'Update'
      this.initializeValue();
    }
    this.element = <any>{};
    this.element.checkedcolor = "gold";
    this.element.uncheckedcolor = "gray";
    this.element.value = 1 ;
    this.element.size = 40;
    this.element.totalstars = 5;
  }

  refresh() {
    if (this.firebaseService.project === null) {
      this.btnTitle = 'Submit';
      this.createForm();
    } else {
      this.item = this.firebaseService.project;
      this.btnTitle = 'Update'
      this.initializeValue();
    }
  }
  createForm() {
    this.projectForm = this.fb.group({
      empName: ['', Validators.required ],
      empId: [''],
      project: ['', Validators.required],
      comment: [''],
      rating: new FormControl(1)
    });
  }

  //For initialize form values in update view
  initializeValue(){
    this.projectForm = this.fb.group({
      empName: new FormControl(this.item.payload.doc.data().empName, Validators.required),
      empId: new FormControl(this.item.payload.doc.data().empId),
      project: new FormControl(this.item.payload.doc.data().project, Validators.required),
      comment: new FormControl(this.item.payload.doc.data().comment),
      rating: new FormControl(this.item.payload.doc.data().rating)
    });
    this.element.value = this.item.payload.doc.data().rating;
  }

  //For update / create contact
  createProject(value){
    value.rating = this.element.value;
    value.userName = this.firebaseService.loggedUser.userName;
    if( this.btnTitle === 'Update') {
      this.firebaseService.updateProjectFeedback(this.item.payload.doc.id, value)
      .then( (res => {
        this.goToListView();
        }),err => {
          console.log(err);
      })
    } else {
      this.firebaseService.createProjectFeedback(value).then(res => {
        this.goToListView();
      });
    }
  }

  goToListView() {
    this.element.value = 1;
    this.firebaseService.project = null;  
    this.projectForm.reset({});
    this.firebaseService.setActiveView(1);
  }

  onRate($event) {
    this.element.value = $event.newValue;
  }
}
