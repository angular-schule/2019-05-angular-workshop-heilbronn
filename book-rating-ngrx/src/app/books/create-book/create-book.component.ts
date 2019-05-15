import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../shared/book';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged, catchError, switchMap, map } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  @Output() createBook = new EventEmitter<Book>();

  bookForm = new FormGroup({
    isbn: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    title: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  source$ = this.bookForm.get('title').valueChanges;
  searchResults$: Observable<string[]>;

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    this.searchResults$ = this.source$.pipe(
      filter((term: string) => term && term.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => this.bs.search(term).pipe(
        map(books => books.map(b => b.title)),
        catchError((err: HttpErrorResponse) => of([
          'Error loading ' + err.url
        ]))
      )),

    );
  }

  isInvalid(name: string) {
    const control = this.bookForm.get(name);
    return control.invalid && control.dirty;
  }

  submitForm() {
    const newBook = {
      ...this.bookForm.value,
      rating: 1
    };

    this.createBook.emit(newBook);
    this.bookForm.reset(); //
  }
}
