import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from '../../models/User.model';
import { UsersService } from '../../services/users.service';
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
  imports: [FontAwesomeModule, RouterLink, ReactiveFormsModule],
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

  genreFeedback = new FormGroup({
    racing: new FormControl(false),
    roguelike: new FormControl(false),
    simulation: new FormControl(false),
    metroidvania: new FormControl(false),
    MMORPG: new FormControl(false),
    sandbox: new FormControl(false),
    puzzle: new FormControl(false),
    arcade: new FormControl(false),
    MOBA: new FormControl(false),
    sports: new FormControl(false),
    adventure: new FormControl(false),
    management: new FormControl(false),
    threeD_platformer: new FormControl(false),
    visual_novel: new FormControl(false),
    survival: new FormControl(false),
    strategy: new FormControl(false),
    JRPG: new FormControl(false),
    third_person_shooter: new FormControl(false)
  });

  usersService = inject(UsersService);

  ngOnInit(){
    const likedGenres = this.usersService.getLikedGenres();
    likedGenres.forEach(likedGenre => {
      this.genreFeedback.patchValue({[likedGenre]: true});
    })
  }

  updateLikedGenres() {
    const currentSurveyStatus = Object(this.genreFeedback.value);
    this.usersService.setLikedGenres(Object.keys(currentSurveyStatus).filter(key => currentSurveyStatus[key] === true));
  }
}