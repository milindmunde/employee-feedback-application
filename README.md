# Angular 9: Learn to Build a CRUD Angular App Quickly (project-feedback-app)

This project is part of an project-feedback-app Assignment where we explore how to perform all CRUD operations in Angular 9 application using cloud Firebase as a database.

This is a Single page Application.

Run npm install to install all the required dependencies

Then run ng serve to start a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

Component Desciption

AppComponent : component created for loading various module & entry point project

Routes : used to routing the application

FirebaseService : Used to Connect with firbase database & put, post, delete & get data from server

HomeComponent: Consist of two child (NewFeedbackComponent, FeedbackListComponent) component implemented using angular material tabs. 

FeedbackListComponent: Used to create project feedback.

FeedbackListComponent: used to show feedback list. user can update/ delete feedback.

NewUserComponent: Used to create login user for application

LoginComponent : used to create login module.

The Application is tested on Chrome & Firefox browser