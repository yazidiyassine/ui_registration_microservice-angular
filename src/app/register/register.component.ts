import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService: UserService, private router: Router) {
  }

  register(registerForm: NgForm){
    this.userService.register(registerForm.value).subscribe({
      next: () => {
        registerForm.reset();
        this.router.navigate(['/login'], { queryParams: { registered: true } });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
