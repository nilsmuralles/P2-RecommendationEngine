import { Injectable } from '@angular/core';
import { Category } from '../models/Category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private availableCategories: Category[] = [
    { id: "1", mode: "Singleplayer" },
    { id: "2", mode: "Multiplayer" }
  ];

  searchCategory(mode:String){
    const cateogry = this.availableCategories.find(category => category.mode === mode);
    if (cateogry) { return cateogry }
    throw new Error(`Category '${mode}' not found.`)
  }
  
}
