import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { GenreSurveyComponent } from './components/genre-survey/genre-survey.component';
import { PlatformSurveyComponent } from './components/platform-survey/platform-survey.component';
import { CategorySurveyComponent } from './components/category-survey/category-survey.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent, LoginComponent, GenreSurveyComponent, PlatformSurveyComponent, CategorySurveyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RecomendationEngine';
}
