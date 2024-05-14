import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private httpClient = inject(HttpClient);
  private apiUrl: String;
  //Juegos añadidos temporalmente mientras se llena la base de datos
  public availableGames: string[] = ["Minecraft", "Fortnite", "Call of Duty", "Among Us", "Valorant", "Undertale", "Deltarune", "Human Resource Machine", "Terraria"];

  constructor() { 
    this.apiUrl = 'http://localhost:8080/api/v1/games';
  }

  getGameCover(name: any){
    return firstValueFrom(this.httpClient.get<any>(`${this.apiUrl}/covers/${name}`));
  }

  getAvailableGames() {
    return this.availableGames;
  }

}
