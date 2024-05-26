import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { User } from '../models/User.model';
import { GenresService } from './genres.service';
import { PlatformsService } from './platforms.service';
import { CategoriesService } from './categories.service';
import { Game } from '../models/Game.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private genreService = inject(GenresService)
  private platformService = inject(PlatformsService)
  private categoryService = inject(CategoriesService)
  private httpClient = inject(HttpClient);
  private url: String;
  private newUser: User = new User;
  private likedGenres: string[];
  private likedPlatforms: string[];
  private likedCategories: string[];
  private recommendationEndpoint: string;

  constructor() {
    this.url = 'https://recommendation-api-0f71bf51e30a.herokuapp.com/api/v1/users';
    this.likedGenres = [];
    this.likedPlatforms = [];
    this.likedCategories = [];
    this.recommendationEndpoint = this.url.replace('users', 'recommendations');
  }

  setLikedGenres(genres: string[]): void {
    this.likedGenres = genres;
  }

  getLikedGenres(): string[] {
    return this.likedGenres;
  }

  setLikedPlatforms(platforms: string[]): void {
    this.likedPlatforms = platforms;
  }

  getLikedPlatforms(): string[] {
    return this.likedPlatforms;
  }

  setLikedCategories(categories: string[]): void {
    this.likedCategories = categories;
  }

  getLikedCategories(): string[] {
    return this.likedCategories;
  }

  createUser(user: any){
    this.newUser = user;   
  }

  setCurrentUser(user: User){
    this.newUser = user;
  }

  getCurrentUser(){
    return this.newUser;
  }

  async setUsersPreferences(){
    this.newUser.likedGames = [];
    this.newUser.games = [];
    this.newUser.likedGenres = [];
    this.newUser.likedPlatforms = [];
    this.newUser.likedCategories = [];

    const formatedGenres = this.getLikedGenres().map(likedGenre => 
      likedGenre.replaceAll("_", " ").replaceAll(/\bthreeD\b/gi, "3D").replace(/\b\w/g, char => char.toUpperCase())
    )
    formatedGenres.forEach(genre => {
      this.newUser.likedGenres?.push(this.genreService.searchGenre(genre))
    })

    const formatedPlatforms = this.getLikedPlatforms().map(likedPlatform => 
      likedPlatform.replaceAll("_", " ").replaceAll("X", "(").replaceAll("Y", "/").replaceAll("Z", ")").replace(/\b\w/g, char => char.toUpperCase()).replaceAll("W", "i")
    );
    formatedPlatforms.forEach(platform => {
      this.newUser.likedPlatforms?.push(this.platformService.searchPlatform(platform))
    })

    const formatedCategories = this.getLikedCategories().map(likedCategory => 
      likedCategory.replace(/\b\w/g, char => char.toUpperCase())
    );
    formatedCategories.forEach(category => {
      this.newUser.likedCategories?.push(this.categoryService.searchCategory(category))
    })

    await this.saveUser(JSON.stringify(this.newUser).toString());
  }

  saveUser(user: any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return firstValueFrom(this.httpClient.post<any>(`${this.url}/add`, user, httpOptions));
  }

  login(user: any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return firstValueFrom(this.httpClient.post<any>(`${this.url}/login`, user, httpOptions));
  }

  getUserByEmail(email: string): Promise<User> {
    return firstValueFrom(this.httpClient.get<User>(`${this.url}/${email}`));
  }  

  async updateUser(user: User): Promise<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return firstValueFrom(this.httpClient.put<User>(`${this.url}/${user.email}`, user, httpOptions));
  }

  getUsersRecommendations(user:User, amount:number): Observable<Game[]> {
    return this.httpClient.get<Game[]>(`${this.recommendationEndpoint}/${user.email}?number=${amount}`);
  }
}
