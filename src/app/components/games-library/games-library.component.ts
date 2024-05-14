import { Component } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGamepad, faPowerOff, faHeart } from '@fortawesome/free-solid-svg-icons';

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
  games: { name: string, url: any }[] = [];

  constructor(private gameService: GamesService){}

  async ngOnInit(){
    this.gameService.getAvailableGames().forEach(async name => {
      const response = await this.gameService.getGameCover(name);
      const options = Object.entries(response).map(([name, url]) => ({ name, url }));
      options.forEach((option) => {
        if (option.name == name) {
          console.log(option);
          this.games.push(option);
        }
      })
    })
  }
}
