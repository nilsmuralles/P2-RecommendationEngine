import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-platform-survey',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './platform-survey.component.html',
  styleUrl: './platform-survey.component.css'
})
export class PlatformSurveyComponent {
}
