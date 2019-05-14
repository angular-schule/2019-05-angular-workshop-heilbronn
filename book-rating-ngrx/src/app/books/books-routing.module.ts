import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CreateBookComponent } from './create-book_/create-book.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'book/:isbn', component: BookDetailsComponent },
  { path: 'create', component: CreateBookComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
