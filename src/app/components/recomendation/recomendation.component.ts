import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/Game.model';
import { GamesService } from '../../services/games.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGamepad, faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './recomendation.component.html',
  styleUrl: './recomendation.component.css'
})

export class RecomendationComponent implements OnInit {
  games: Game[] = [];
  faGamepad = faGamepad;
  faLogOut = faPowerOff;

  constructor(private gameService: GamesService) { }

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