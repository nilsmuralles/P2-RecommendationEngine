import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
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
  
  getGameCover(name: string): Observable<string> {
    return this.httpClient.get<string>(`${this.apiUrl}/covers/${name}`);
  }
}