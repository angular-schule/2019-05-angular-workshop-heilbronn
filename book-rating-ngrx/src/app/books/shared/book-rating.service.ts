import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  doRateUp(book: Book) {
    return book;
  }

  doRateDown(book: Book) {
    return book;
  }
}
