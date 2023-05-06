import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userAuthService: UserAuthService,
    protected userService: UserService,
    private router: Router){

  }

  ngOnInit(): void {
    if(this.isLoggedIn()){
      if(this.userService.roleMatch(['ADMIN'])){
        this.router.navigate(['/admin']);
      } else if(this.userService.roleMatch(['STUDENT'])){
        this.router.navigate(['/student']);
      }
    }
  }

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

}
