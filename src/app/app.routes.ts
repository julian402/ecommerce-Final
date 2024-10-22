import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListproductComponent } from './pages/listproduct/listproduct.component';
import { Component } from '@angular/core';
import { DetailComponent } from './pages/detail/detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ListproductComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
