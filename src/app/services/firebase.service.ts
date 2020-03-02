import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  loggedUser: any = null;
  project: any = null;
  public changeView = new Subject<string>();
  
  constructor(public db: AngularFirestore) {

  }

  updateProjectFeedback(userKey, value){
    return this.db.collection('projectFeedbacks').doc(userKey).set(value);
  }

  deleteProjectFeedback(userKey){
    return this.db.collection('projectFeedbacks').doc(userKey).delete();
  }

  validateUser(){
    return this.db.collection('users').snapshotChanges();
  }

  createUser(value){
    return this.db.collection('users').add({
      name: value.name,
      userName: value.userName,
      password: value.password
    });
  }
  createProjectFeedback(value){
    return this.db.collection('projectFeedbacks').add({
      userName: value.userName,
      empName: value.empName,
      empId: value.empId,
      rating: value.rating,
      comment: value.comment,
      project: value.project
    });
  }
  getProjetFeedbackList(){
    return this.db.collection('projectFeedbacks').snapshotChanges();
  }
  setActiveView(value: any) {
    this.changeView.next(value); //it is publishing this value to all the subscribers that have already subscribed to this message
  }
}
