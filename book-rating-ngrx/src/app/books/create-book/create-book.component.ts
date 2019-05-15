import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../shared/book';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged, catchError, switchMap } from 'rxjs/operators';
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

  searchResults$: Observable<Partial<Book>[]>;

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    this.searchResults$ = this.bookForm.get('title').valueChanges.pipe(
      filter((term: string) => term && term.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => this.bs.search(term).pipe(
        catchError((err: HttpErrorResponse) => of([{
          title: 'Error loading ' + err.url
        }]))
      ))
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
    this.bookForm.reset();
  }
}
