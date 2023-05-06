import { Component } from '@angular/core';
import {NgForm} from '@angular/forms'
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  registered: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  successMessage: string ='';
  errorMessage: string = '';

  constructor(private userService: UserService, private userAuthService: UserAuthService,
    private router:Router, private route: ActivatedRoute){
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.registered = params['registered'] === 'true';
      if (this.registered) {
        this.showSuccessMessage = true;
        this.successMessage='Vous vous êtes inscrit avec succès, vous pouvez maintenant vous connecter !';
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      }
    });
  }

  login(loginForm: NgForm){
    this.userService.login(loginForm.value).subscribe(
      (response:any)=>{
          this.userAuthService.setRoles(response.user.role);
          this.userAuthService.setToken(response.jwtToken);

          const role = response.user.role[0].roleName;

          if (role === 'ADMIN'){
              this.router.navigate(['/admin']);
          }else{
            this.router.navigate(['/student']);
          }
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Une erreur est survenue. Essayez plus tard.';
        this.showErrorMessage = true;
      }
    );
  }

}
