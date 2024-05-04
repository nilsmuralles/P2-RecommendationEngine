import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGun } from '@fortawesome/free-solid-svg-icons';
import { faSkull } from '@fortawesome/free-solid-svg-icons';
import { faChess } from '@fortawesome/free-solid-svg-icons';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faHandBackFist } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-genre-survey',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './genre-survey.component.html',
  styleUrl: './genre-survey.component.css'
})

export class GenreSurveyComponent {
  faGun = faGun;
  faSkull = faSkull;
  faChess = faChess;
  faCar = faCar;
  faShieldHalved = faShieldHalved;
  faHandBackFist = faHandBackFist;
}