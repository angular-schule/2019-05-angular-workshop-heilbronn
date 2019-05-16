import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BookStoreService } from '../shared/book-store.service';
import { EMPTY } from 'rxjs';
import { BookRatingService } from '../shared/book-rating.service';
import { Book } from '../shared/book';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: BookStoreService,
          useValue: {
            setRating: () => EMPTY,
            getAll: () => EMPTY
          }
        },
        {
          provide: BookRatingService,
          useValue: {
            doRateUp: book => book
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should use the BookRatingService to rate a book',  () => {
    const rs = TestBed.get<BookRatingService>(BookRatingService);

    spyOn(rs, 'doRateUp').and.callThrough();

    const theBook = { isbn: '000'} as Book;
    component.doRateUp(theBook);

    expect(rs.doRateUp).toHaveBeenCalledWith(theBook);
    expect(rs.doRateUp).not.toHaveBeenCalledTimes(2);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
