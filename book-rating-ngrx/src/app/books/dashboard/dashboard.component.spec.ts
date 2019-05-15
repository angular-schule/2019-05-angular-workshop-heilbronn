import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EMPTY } from 'rxjs';

import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { DashboardComponent } from './dashboard.component';


describe('DashboardComponent', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {

    const bookRatingMock = {
      rateUp: book => book
    };

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent
      ],
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
        useValue: bookRatingMock
      }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doRateUp() should forward the execution to BookRatingService', () => {

    const rs = TestBed.get(BookRatingService);
    spyOn(rs, 'rateUp').and.callThrough();

    component.doRateUp({ isbn: '000' } as Book);

    expect(rs.rateUp).toHaveBeenCalled();
    expect(rs.rateUp).not.toHaveBeenCalledTimes(2);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
