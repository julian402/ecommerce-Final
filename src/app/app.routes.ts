import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListproductComponent } from './pages/listproduct/listproduct.component';
import { Component } from '@angular/core';
import { DetailComponent } from './pages/detail/detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ListproductComponent },
  { path: 'detail/:id', component: DetailComponent },
];
