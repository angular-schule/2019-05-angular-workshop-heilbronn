import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { Observable, of } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, mergeMap, concatMap, switchMap, catchError } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  @Output()
  createBook = new EventEmitter<Book>();

  bookForm = new FormGroup({
    isbn: new FormControl('', [Validators.required, Validators.minLength(3)]),
    title: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  source$: Observable<string> = this.bookForm.get('title').valueChanges;
  searchResults$: Observable<any>;

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    this.searchResults$ = this.source$.pipe(
     filter(x => x && x.length >= 3),
     debounceTime(500),
     distinctUntilChanged(),
     switchMap(term => this.bs.search(term).pipe(
       map(books => books.map(book => book.title)),
       catchError((err: HttpErrorResponse) => of(['Es ist ein Fehler aufgetreten']))
     ))
    );
  }

  isInvalid(name: string) {
    const control = this.bookForm.get(name);
    return control.invalid && control.dirty;
  }

  submitForm() {
    const newBook: Book = {
      ...this.bookForm.value,
      rating: 1
    };

    this.createBook.emit(newBook);
    this.bookForm.reset();
  }

}
