import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/Game.model';

@Injectable({
  providedIn: 'root'
})

export class GamesService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.apiUrl = 'http://localhost:8080/api/v1/games';
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
}