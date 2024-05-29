import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../models/Game.model';
import { GamesService } from '../../services/games.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGamepad, faPowerOff, faHeart, faRobot, faShapes, faStarHalfStroke, faLaptopCode, faKeyboard, faExclamation, faCheck} from '@fortawesome/free-solid-svg-icons';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-games-library',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule, NgxPaginationModule, RouterLink],
  templateUrl: './games-library.component.html',
  styleUrl: './games-library.component.css'
})
export class GamesLibraryComponent implements OnInit {
  currentUser: User = new User();
  games: Game[] = [];
  gameCovers: { [key: string]: string } = {};
  faGamepad = faGamepad;
  faLogOut = faPowerOff;
  faHeart = faHeart;
  faStar = faStarHalfStroke;
  faGenre = faRobot;
  faCategory = faShapes;
  faDevelopers = faLaptopCode;
  faPlatforms = faKeyboard;
  faCheck = faCheck;
  faExclamation = faExclamation;
  nameOfGame: string = '';
  gameSearched = new Game();
  searchStatus = 0;
  setOfRecomendedGames: number = 0;
  currentGame = 0;
  p: number = 1;
  itemsPerPage: number = 60;
  currentFirstCover: number = 0;
  currentLastCover: number = (this.itemsPerPage) * 8;
  totalGames: any;
  @Input('user') userEmail!: string;
  fireGameAlert: boolean = false;
  fireAlreadyAddedAlert: boolean = false;
  alertMessage: string = "";

  constructor(private gameService: GamesService, private userService: UsersService) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.currentUser.email = this.userEmail
    if (this.userEmail) {
      this.userService.getUserByEmail(this.userEmail).then(user =>{
        this.currentUser = user
        this.games = user.games || []
        this.setOfRecomendedGames = this.games.length
        this.loadGameCovers(this.currentFirstCover, this.currentLastCover)
        this.totalGames = this.games.length
      }).catch(error =>{
        console.error('Error fetching user:', error)
      });

      const nextBtn = document.querySelector(".next-game")
      nextBtn?.addEventListener("click", this.handleNextSlide.bind(this))

      const prevBtn = document.querySelector(".prev-game")
      prevBtn?.addEventListener("click", this.handlePrevSlide.bind(this))
    }
  }

  loadGameCovers(start:number, end:number) {
    this.gameService.getGameCovers(start, end).subscribe(covers => {
      covers.forEach(cover => {
        const gameName: string = String(Object.values(cover)[2]);
        if (Object.keys(cover).includes('cover')) {
          const gameCover: string = String(Object.values(Object.values(cover)[1])[1]).replace("thumb", "cover_big");
          this.gameCovers[gameName] = gameCover;
        } 
      })
    })
  }

  searchGame(searchForm: NgForm){
    this.gameService.getGameByName(this.nameOfGame.trim()).subscribe((game) =>{
      if(this.currentUser.games?.find(storedGame =>{if(storedGame.name == game.name) return true
        else return false
      })){
        this.gameSearched = game
      }else{
        this.searchStatus = 404
      }
    }, error =>{
      this.searchStatus = error.status
    });
    searchForm.resetForm();
    this.clearSearchResult();
  }

  clearSearchResult(){
    this.gameSearched = new Game();
    this.searchStatus = 0;
  }

  showGameInfo(){
    document.addEventListener("click", e => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("game-card")) {
        const dialog = target.querySelector('dialog');
        dialog?.showModal();
      }
    });
  }

  exitGameInfo(){
    document.addEventListener("click", e => {
      const target = e.target as HTMLElement;
      if (target.parentElement != null) {
        const dialog = target.parentElement as HTMLDialogElement
        dialog.close();
      }
    })
  }

  getGenre(game:Game){
    return String(Object.values(Object.values(Object.values(game)[4]))[1])
  }

  getPlatform(game:Game){
    return String(Object.values(Object.values(Object.values(game)[5][0]))[1])
  }

  getCategory(game:Game){
    return String(Object.values(Object.values(Object.values(game)[6][0]))[1])
  }

  handleNextSlide(e: Event) {
    const target = e.target as HTMLElement;
    if (target.classList.contains("next-game") && target.parentElement?.parentElement) {
      const track = target.parentElement.parentElement.querySelector('.track') as HTMLElement;
      this.currentGame = (this.currentGame + 1) % this.setOfRecomendedGames;
      track.style.transform = `translateX(${-this.currentGame * 100}%)`;
    }
  }

  handlePrevSlide(e: Event) {
    const target = e.target as HTMLElement;
    if (target.classList.contains("prev-game") && target.parentElement?.parentElement) {
      const track = target.parentElement.parentElement.querySelector('.track') as HTMLElement;
      this.currentGame = (this.currentGame - 1 + this.setOfRecomendedGames) % this.setOfRecomendedGames;
      track.style.transform = `translateX(${-this.currentGame * 100}%)`;
    }
  }

  checkForNextCovers(p: any) {
    if (p as number > 7) {
      this.loadGameCovers((this.currentLastCover + 1), (this.currentLastCover + (1 * 480)));
    }
    if (p as number > 15) {
      this.loadGameCovers((this.currentLastCover + 2), (this.currentLastCover + (2 * 480)));
    }
    if (p as number > 23) {
      this.loadGameCovers((this.currentLastCover + 3), 1771);
    }
  }

  async likeGame(game: Game) {
    await this.userService.getUserByEmail(this.userEmail).then(user => {
      const existingGame = user.likedGames?.find(existingGame => existingGame.name === game.name);
      if (!existingGame) {
        user.likedGames?.push(game);
        this.alertMessage = `${game.name} le ha gustado`;

      } else {
        user.likedGames = user.likedGames?.filter(existingGame => existingGame.name !== game.name);

        this.alertMessage = `${game.name} ya no le gusta`;
      }

      this.userService.updateUser(user);
      this.fireGameAlert = true;

      this.currentUser = user;


      setTimeout(() => {
        this.fireGameAlert = false;
      }, 2000);

    }).catch(error => {
      console.log(error);
    });
  }

  isLiked(game: Game):boolean{
    if(this.currentUser.likedGames?.find(likedGame=>{
      if(likedGame.name == game.name) return true
      else return false
    })) return true
    else return false
  }
}