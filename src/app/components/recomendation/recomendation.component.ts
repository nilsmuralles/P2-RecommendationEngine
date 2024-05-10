import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGamepad, faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './recomendation.component.html',
  styleUrl: './recomendation.component.css'
})
export class RecomendationComponent {
  faGamepad = faGamepad;
  faLogOut = faPowerOff;
}
