import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CreateBookComponent } from './create-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookStoreService } from '../shared/book-store.service';
import { of } from 'rxjs';

describe('CreateBookComponent', () => {
  let component: CreateBookComponent;
  let fixture: ComponentFixture<CreateBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ CreateBookComponent ],
      providers: [{
        provide: BookStoreService,
        useValue: {
          search: (term: string) => of([
            { title: 'Book with title ' + term },
            { title: 'Another book with title ' + term }
          ])
        }
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
