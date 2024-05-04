import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformSurveyComponent } from './platform-survey.component';

describe('PlatformSurveyComponent', () => {
  let component: PlatformSurveyComponent;
  let fixture: ComponentFixture<PlatformSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformSurveyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlatformSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
