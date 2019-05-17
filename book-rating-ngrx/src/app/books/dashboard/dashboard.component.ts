import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { BookRatingService } from '../shared/book-rating.service';
import { Store, select } from '@ngrx/store';
import { State } from '../../reducers';
import { LoadBooks } from '../actions/book.actions';
import { getBooksLoading, getAllBooks } from '../selectors/book.selectors';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  loading$ = this.store.pipe(select(getBooksLoading));
  books$ = this.store.pipe(select(getAllBooks));

  constructor(private service: BookStoreService,
    private ratingService: BookRatingService,
    private store: Store<State>) {

      // this.store.dispatch(new LoadBooks());
  }

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
