import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookComponent } from './create-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookStoreService } from '../shared/book-store.service';

describe('CreateBookComponent', () => {
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
        useValue: { search: (term: string) => ({
          title: 'Book with title ' + term
        }) }
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
