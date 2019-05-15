import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CreateBookComponent } from './create-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookStoreService } from '../shared/book-store.service';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

fdescribe('CreateBookComponent', () => {
  let component: CreateBookComponent;
  let fixture: ComponentFixture<CreateBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [CreateBookComponent],
      providers: [{
        provide: BookStoreService,
        useValue: {
          search: (term: string) => of([
            { title: 'Book with title ' + term },
            { title: 'Another book with title ' + term }
          ])}
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should use the search term to query the search API', fakeAsync(() => {

    let lastResult = [];
    component.searchResults$.subscribe(r => lastResult = r);

    component.bookForm.get('title').setValue('Angular');
    tick(500);

    expect(lastResult).toContain('Book with title Angular');
  }));

  // https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/testing/marble-testing.md
  it('should use the search term to query the search API (via marbles)', () => {

    const scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    scheduler.run(helpers => {
      const { cold, expectObservable } = helpers;

      component.source$ = cold('a -- b 1000ms c 1000ms d', {
        a: 'An',
        b: 'Angular',
        c: '',
        d: 'XXX'
      });
      component.ngOnInit(); // builds the pipe again with our source

      const result = component.searchResults$.pipe(
        map(manyBooks => manyBooks.shift())
      );

      const expectedMarbles = '500ms --- x 2000ms - y';
      const expectedVales = {
        x: 'Book with title Angular',
        y: 'Book with title XXX'
      };

      expectObservable(result).toBe(expectedMarbles, expectedVales);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
