import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/User.model';
import { GenresService } from './genres.service';
import { Genre } from '../models/Genre.model';
import { PlatformsService } from './platforms.service';
import { CategoriesService } from './categories.service';

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

  constructor() {
    this.url = 'http://localhost:8080/api/v1/users';
    this.likedGenres = [];
    this.likedPlatforms = [];
    this.likedCategories = [];
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

    const response = await this.saveUser(JSON.stringify(this.newUser).toString());
    console.log(response);
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
}
