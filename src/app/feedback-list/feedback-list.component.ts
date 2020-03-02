import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit, OnDestroy {
  element:any = null;
  items: any[] = [];
  constructor( public firebaseService: FirebaseService,
    private router: Router) { }

  ngOnInit() {
    this.element = <any>{};
    this.element.checkedcolor = "gold";
    this.element.uncheckedcolor = "gray";
    this.element.value = 1 ;
    this.element.size = 30;
    this.element.totalstars = 5;
    this.element.readonly = true;
    if (this.firebaseService.loggedUser) {
      this.getProjetFeedbackList();
    } else {
      this.router.navigate(['/login']);
    }
  }

  refresh() {
    console.log('in Feedback List', this.items);
    this.getProjetFeedbackList();
  }
  // For fetching contact list
  getProjetFeedbackList(){
    this.items = [];
    this.firebaseService.getProjetFeedbackList().subscribe(result => {
      let project = <any>{};
      result.map((obj)=>{
        project = obj.payload.doc.data();
        if (project.userName === this.firebaseService.loggedUser.userName) {
          this.items.push(obj);
        }
      });
    })
  }

  // For update project feedback
  updateFeedback(item){
    this.firebaseService.project = item;
    this.firebaseService.setActiveView(0);
  }

  //For delete feedback
  deleteFeedback( item ){
    this.firebaseService.deleteProjectFeedback(item.payload.doc.id)
    .then( (res => {
        this.refresh();
      }),err => {
        console.log(err);
    })
  }

  ngOnDestroy() { 
    this.items = [];  
  }
}
