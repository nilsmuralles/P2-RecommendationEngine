import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GenreSurveyComponent } from './components/genre-survey/genre-survey.component';
import { PlatformSurveyComponent } from './components/platform-survey/platform-survey.component';
import { CategorySurveyComponent } from './components/category-survey/category-survey.component';
import { RecomendationComponent } from './components/recomendation/recomendation.component';

//Agregar las rutas respectivas por cada vista hecha
export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'genre-survey', component: GenreSurveyComponent},
    {path: 'platform-survey', component: PlatformSurveyComponent},
    {path: 'category-survey', component: CategorySurveyComponent},
    {path: 'recomendation', component: RecomendationComponent},

    //Estas dos rutas siempre tienen que ir hasta abajo
    {path:'', redirectTo: '/login', pathMatch: 'full'},
    {path:'**', redirectTo: '/login', pathMatch: 'full'}
];
