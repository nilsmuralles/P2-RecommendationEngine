import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-category-survey',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './category-survey.component.html',
  styleUrl: './category-survey.component.css'
})
export class CategorySurveyComponent {

}
