import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { NewFeedbackComponent } from '../new-feedback/new-feedback.component';
import { FeedbackListComponent } from '../feedback-list/feedback-list.component';
import { MatTabChangeEvent}  from '@angular/material/tabs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  userName: string;
  activeViewIndex: any = 1;
  subscription: Subscription;
  @ViewChild(NewFeedbackComponent) private newFeedbackComponent: NewFeedbackComponent;
  @ViewChild(FeedbackListComponent) private feedbackListComponent: FeedbackListComponent;


  constructor( public firebaseService: FirebaseService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.firebaseService.loggedUser) {
      this.userName = this.firebaseService.loggedUser.userName;
    } else {
      this.router.navigate(['/login']);
    }
    this.subscription = this.firebaseService.changeView.subscribe(
      (viewIndex) => {
        this.activeViewIndex = viewIndex;
      }
    );
  }
  
  onTabChanged(event: MatTabChangeEvent)
  {
    if(event.index === 0) {
      this.activeViewIndex = 0;
      this.newFeedbackComponent.refresh();//Or whatever name the method is called
      this.firebaseService.project = null;
    } else {
      this.activeViewIndex = 1;
      this.feedbackListComponent.refresh();//Or whatever name the method is called
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
