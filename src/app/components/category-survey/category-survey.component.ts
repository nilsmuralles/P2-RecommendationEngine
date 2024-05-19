import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/User.model';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-category-survey',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, ReactiveFormsModule],
  templateUrl: './category-survey.component.html',
  styleUrl: './category-survey.component.css'
})
export class CategorySurveyComponent {

  categoryFeedback = new FormGroup({
    singleplayer: new FormControl(false),
    multiplayer: new FormControl(false)
  })

  usersService = inject(UsersService);
  router = new Router;

  ngOnInit(){
    const likedCategories = this.usersService.getLikedCategories();
    likedCategories.forEach(likedCategory => {
      this.categoryFeedback.patchValue({[likedCategory]: true});
    });
  }

  updateLikedCategories(){
    const currentSurveyStatus = Object(this.categoryFeedback.value);
    this.usersService.setLikedCategories(Object.keys(currentSurveyStatus).filter(key => currentSurveyStatus[key] === true))
  }

  addUsersPreferences(){
    this.usersService.setUsersPreferences();
    this.router.navigateByUrl('/recomendation');
  }
}
