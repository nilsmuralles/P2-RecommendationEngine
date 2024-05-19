import { Injectable } from '@angular/core';
import { Platform } from '../models/Platform.model';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  private availablePlatforms: Platform[] = [
    { id: "1", name: "PlayStation 4" },
    { id: "2", name: "Xbox 360" },
    { id: "3", name: "Nintendo Switch" },
    { id: "4", name: "PC" },
    { id: "5", name: "iOS (iPhone/iPad)" },
    { id: "6", name: "Xbox One" }
  ];

  searchPlatform(name:string){
    const platform = this.availablePlatforms.find(platform => platform.name === name);
    if (platform) { return platform; }
    throw new Error(`Platform '${name}' not found.`)
  }
}
