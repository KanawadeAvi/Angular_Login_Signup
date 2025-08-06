import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Signup } from './signup/signup';

export const routes: Routes = [
    {path:'login',component:Login},
    {path:'',component:Home},
    {path:'signup',component:Signup}
];
