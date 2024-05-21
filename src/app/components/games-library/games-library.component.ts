import { Component } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGamepad, faPowerOff, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Game } from '../../models/Game.model';

@Component({
  selector: 'app-games-library',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './games-library.component.html',
  styleUrl: './games-library.component.css'
})
export class GamesLibraryComponent {
  faGamepad = faGamepad;
  faLogOut = faPowerOff;
  faHeart = faHeart;
  games: Game[] = [];

  constructor(private gameService: GamesService){}

  ngOnInit() {
    this.gameService.getAllGames().subscribe(games => {
      this.games = games;
      this.loadGameCovers();
    });
  }

  loadGameCovers() {

  }
}
