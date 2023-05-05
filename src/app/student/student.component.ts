import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  message: string = "";
  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.forStudent();
  }

  forStudent(){
    this.userService.forStudent().subscribe({
      next: (response) => {
        this.message = response;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      }
    });
  }
}
