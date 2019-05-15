import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../shared/book';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged, map, mergeMap, takeUntil } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';
import { Observable } from 'rxjs';

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

  searchResults$: Observable<Book[]>;

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    this.searchResults$ = this.bookForm.get('title').valueChanges.pipe(
      filter((term: string) => term && term.length >= 3),
      debounceTime(1000),
      distinctUntilChanged(),
      mergeMap(term => this.bs.search(term)),
    );
  }

  isInvalid(name: string) {
    const control = this.bookForm.get(name);
    return control.invalid && control.dirty;
  }

  submit() {
    const newBook: Book = {
      ...this.bookForm.value,
      rating: 1
    };

    this.createBook.emit(newBook);
    this.bookForm.reset();
  }
}
