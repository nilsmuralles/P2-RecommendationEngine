import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faSkull } from '@fortawesome/free-solid-svg-icons';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faChessBoard } from '@fortawesome/free-solid-svg-icons';
import { faSoccerBall } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faPeopleRoof } from '@fortawesome/free-solid-svg-icons';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faCampground } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faDice } from '@fortawesome/free-solid-svg-icons';  
import { faGun } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-genre-survey',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './genre-survey.component.html',
  styleUrl: './genre-survey.component.css'
})

export class GenreSurveyComponent {
  faCar = faCar;
  faHeart = faHeart;
  faShieldHalved = faShieldHalved;
  faSkull = faSkull;
  faPersonDigging = faPersonDigging;
  faPuzzlePiece = faPuzzlePiece;
  faCoins = faCoins;
  faChessBoard = faChessBoard;
  faSoccerBall = faSoccerBall;
  faMap = faMap;
  faPeopleRoof = faPeopleRoof;
  faCube = faCube;
  faBook = faBook;
  faCampground = faCampground;
  faLightbulb = faLightbulb;
  faDice = faDice;
  faGun = faGun;
}