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
  gameCovers: { [key: string]: string } = {};
  faGamepad = faGamepad;
  faLogOut = faPowerOff;

  constructor(private gameService: GamesService) { }

  ngOnInit() {
    this.gameService.getAllGames().subscribe(games => {
      this.games = games;
      this.loadGameCovers();
    });
  }

  loadGameCovers() {
    this.gameService.getGameCovers().subscribe(covers => {
      covers.forEach(cover => {
        if (Object.keys(cover).includes('cover')) {
          const gameName: string = String(Object.values(cover)[2]);
          const gameCover: string = String(String(Object.values(Object.values(cover)[1])[1]).replace("thumb", "cover_big"));
          this.gameCovers[gameName] = gameCover;
        } 
      })
    })
  }
}