import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreSurveyComponent } from './genre-survey.component';

describe('GenreSurveyComponent', () => {
  let component: GenreSurveyComponent;
  let fixture: ComponentFixture<GenreSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreSurveyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenreSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
