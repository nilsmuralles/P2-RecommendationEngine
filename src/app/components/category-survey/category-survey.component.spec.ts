import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategorySurveyComponent } from './category-survey.component';

describe('CategorySurveyComponent', () => {
  let component: CategorySurveyComponent;
  let fixture: ComponentFixture<CategorySurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySurveyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorySurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
