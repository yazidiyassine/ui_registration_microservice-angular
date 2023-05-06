import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private userService: UserService){
    this.getUsers();
  }

  userDetails: any[] = [];

  userUpdated = {
    apogee: 0,
    userName: "",
    userFirstName: "",
    userLastName: "",
    userPassword: ""
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.userDetails = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.getUsers();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateUser(user: any): void {
    this.userService.updateUser(this.userUpdated).subscribe({
      next: () => {
        this.getUsers();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  edit(user: any) {
    this.userUpdated = user;
  }

}



