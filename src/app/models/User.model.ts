import { Category } from "./Category.model";
import { Game } from "./Game.model";
import { Genre } from "./Genre.model";
import { Platform } from "./Platform.model";
export class User{
    name?: string;
    email?: string;
    password?: string;
    games?: Game[];
    likedGames?: Game[];
    likedGenres?: Genre[];
    likedPlatforms?: Platform[];
    likedCategories?: Category[];
}