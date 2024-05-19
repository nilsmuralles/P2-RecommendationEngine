import { Injectable } from '@angular/core';
import { Genre } from '../models/Genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private availableGenres: Genre[] = [
    { id: "1", name: "Racing" },
    { id: "2", name: "Roguelike" },
    { id: "3", name: "Simulation" },
    { id: "4", name: "Metroidvania" },
    { id: "5", name: "MMORPG" },
    { id: "6", name: "Sandbox" },
    { id: "7", name: "Puzzle" },
    { id: "8", name: "Arcade" },
    { id: "9", name: "MOBA" },
    { id: "10", name: "Sports" },
    { id: "11", name: "Adventure" },
    { id: "12", name: "Management" },
    { id: "13", name: "3D Platformer" },
    { id: "14", name: "Visual Novel" },
    { id: "15", name: "Survival" },
    { id: "16", name: "Strategy" },
    { id: "17", name: "JRPG" },
    { id: "18", name: "Third Person Shooter" }
  ];

  searchGenre(name: String): Genre {
    const genre = this.availableGenres.find(genre => genre.name === name);
    if (genre) { return genre; }
    throw new Error(`Genre '${name}' not found.`);
  }
}
