import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Game } from '../models/Game.model';

@Injectable({
  providedIn: 'root'
})

export class GamesService {
  private apiUrl: string;
  private recommendationEndpoint: string;

  constructor(private httpClient: HttpClient) { 
    this.apiUrl = 'https://recommendation-api-0f71bf51e30a.herokuapp.com/api/v1/games';
    this.recommendationEndpoint = this.apiUrl.replace('games', 'recommendations');
  }

  getAllGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(`${this.apiUrl}/all`);
  }
  
  getGameCovers(start:number, end:number): Observable<Object[]> {
    return this.httpClient.get<Object[]>(`${this.apiUrl}/covers?start=${start}&end=${end}`);
  }

  getGameByName(name:any){
    return this.httpClient.get<Game>(`${this.apiUrl}/${name}`);
  }

  getRecommendedGamesCovers(recommendedGames:Game[]): Observable<Object[]> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.post<any>(`${this.recommendationEndpoint}/covers`, recommendedGames, httpOptions)
  }
}