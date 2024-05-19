import { Category } from "./Category.model";
import { Genre } from "./Genre.model";
import { Platform } from "./Platform.model";
export class Game{
    name?: string;
    developers?: string;
    achievements?: number;
    released?: string;
    rating?: string;
    genres?: Genre[];
    platforms?: Platform[];
    categories?: Category[];
    cover?: string;
}