import { Component } from '@angular/core';
import {NgForm} from '@angular/forms'
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private userAuthService: UserAuthService,
    private router:Router){

  }

  login(loginForm: NgForm){
    this.userService.login(loginForm.value).subscribe(
      (response:any)=>{
          this.userAuthService.setRoles(response.user.role);
          this.userAuthService.setToken(response.jwtToken);

          const role = response.user.role[0].roleName;

          console.log(response);

          if (role === 'ADMIN'){
              this.router.navigate(['/admin']);
          }else{
            this.router.navigate(['/student']);
          }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
