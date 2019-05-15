import { Component } from '@angular/core';
import { of } from 'rxjs';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  loading$ = of(false); // TODO: Implement logic
  books$ = this.service.getAll();

  constructor(private service: BookStoreService, private ratingService: BookRatingService) { }

  doCreateBook(book: Book) {
    this.service.create(book)
      .subscribe(() => this.books$ = this.service.getAll());
  }

  doRateUp(book: Book) {
    const ratedBook = this.ratingService.rateUp(book);
    this.service.setRating(book.isbn, ratedBook.rating)
      .subscribe(() => this.books$ = this.service.getAll());
  }

  doRateDown(book: Book) {
    const ratedBook = this.ratingService.rateDown(book);
    this.service.setRating(book.isbn, ratedBook.rating)
      .subscribe(() => this.books$ = this.service.getAll());
  }
}
