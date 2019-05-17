import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State as BookState } from '../reducers/book.reducer';

// weil wir ggf. lazy loading machen wollen
export const getBookState = createFeatureSelector<BookState>('book');

export const getBooksLoading = createSelector(
  getBookState,
  state => state.loading
);

export const getAllBooks = createSelector(
  getBookState,
  state => state.books
);
