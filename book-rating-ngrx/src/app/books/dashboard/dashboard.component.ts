import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  loading$ = of(false); // TODO: Implement logic
  books$ = this.service.getAll();

  constructor(private service: BookStoreService,
    private ratingService: BookRatingService) { }

  ngOnInit() {
  }

  doCreateBook(book: Book) {
    this.service.create(book)
      .subscribe(() => this.books$ = this.service.getAll());
  }

  doRateUp(book: Book) {
    const ratedBook = this.ratingService.doRateUp(book);
    this.service.setRating(book.isbn, ratedBook.rating)
      .subscribe(e => console.log(e));
  }

  doRateDown(book: Book) {
    const ratedBook = this.ratingService.doRateDown(book);
    this.service.setRating(book.isbn, ratedBook.rating)
      .subscribe(e => console.log(e));
  }
}
