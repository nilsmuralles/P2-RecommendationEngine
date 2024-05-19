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

  async loadGameCovers() {
    for (const game of this.games) {
      const coversResponse = await this.gameService.getGameCover(String(game.name)).toPromise();
      if (coversResponse) {
        const coversOptions = Object.entries(coversResponse).map(([name, url]) => ({ name, url }));
        const selectedCover = coversOptions.find(option => option.name === game.name);
        if (selectedCover) { game.cover = selectedCover.url;}
      }
    }
  }
}
