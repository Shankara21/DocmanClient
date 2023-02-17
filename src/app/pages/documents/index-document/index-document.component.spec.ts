import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDocumentComponent } from './index-document.component';

describe('IndexDocumentComponent', () => {
  let component: IndexDocumentComponent;
  let fixture: ComponentFixture<IndexDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
