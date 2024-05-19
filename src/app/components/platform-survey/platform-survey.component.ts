import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/User.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-platform-survey',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, ReactiveFormsModule],
  templateUrl: './platform-survey.component.html',
  styleUrl: './platform-survey.component.css'
})
export class PlatformSurveyComponent {

  platformFeedback = new FormGroup({
    playStation_4: new FormControl(false),
    xbox_360: new FormControl(false),
    nintendo_switch: new FormControl(false),
    PC: new FormControl(false),
    wOS_XwPhoneYwPadZ: new FormControl(false),
    xbox_one: new FormControl(false)
  });

  usersService = inject(UsersService);

  ngOnInit(){
    const likedPlatformms = this.usersService.getLikedPlatforms();
    likedPlatformms.forEach(likedPlatform => {
      this.platformFeedback.patchValue({[likedPlatform]: true});
    });
  }

  updateLikedPlatforms(){
    const currentSurveyStatus = Object(this.platformFeedback.value);
    this.usersService.setLikedPlatforms(Object.keys(currentSurveyStatus).filter(key => currentSurveyStatus[key] === true))
  }
}
