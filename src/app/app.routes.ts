import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { HomeComponent } from './home/home.component'

export const rootRouterConfig: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/first', component: LoginComponent }
];
