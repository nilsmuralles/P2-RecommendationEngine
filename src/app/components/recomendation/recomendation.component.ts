import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../models/Game.model';
import { GamesService } from '../../services/games.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGamepad, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './recomendation.component.html',
  styleUrl: './recomendation.component.css'
})

export class RecomendationComponent implements OnInit {
  @Input('user') user !: string;
  games: Game[] = [];
  gameCovers: { [key: string]: string } = {};
  faGamepad = faGamepad;
  faLogOut = faPowerOff;
  nameOfGame: string = '';
  gameSearched = new Game();
  searchStatus = 0;
  

  constructor(private gameService: GamesService, private userService: UsersService) { }

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
  
  searchGame(searchForm: NgForm){
    this.clearSearchResult();
    this.gameService.getGameByName(this.nameOfGame).subscribe((game) =>{
      this.gameSearched = game
    }, error =>{
      this.searchStatus = error.status 
    });
    searchForm.resetForm();
  }

  clearSearchResult(){
    this.gameSearched = new Game();
    this.searchStatus = 0;
  }

  async addToLibrary(game: Game) {
    try {
      const user = await this.userService.getUserByEmail(this.user);
      if (user) {
        user.games = user.games || [];
        user.games.push(game);
        this.userService.updateUser(user);
        console.log("Se agregó");
      }
    } catch (error) {
      console.error("Error al agregar el juego a la libreria", error);
    }
  }
}