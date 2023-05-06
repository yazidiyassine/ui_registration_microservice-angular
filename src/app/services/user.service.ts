import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:9090";

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );

  reqHdr = new HttpHeaders(
    { "Authorization": "Bearer " + this.userAuthService.getToken() }
  );

  constructor(private httpclient: HttpClient,
    private userAuthService: UserAuthService) { }

  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + "/authenticate", loginData, { headers: this.requestHeader });
  }

  public forStudent() {
    return this.httpclient.get(this.PATH_OF_API + '/forStudent', { responseType: 'text' })
  }

  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', { responseType: 'text' })
  }

  public register(registerData: any) {
    return this.httpclient.post(this.PATH_OF_API + "/registerNewUser", registerData, { headers: this.requestHeader });
  }

  public roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return false;
  }

  public getUsers() {
    return this.httpclient.get(this.PATH_OF_API + '/getUsers', { headers: this.reqHdr });
  }

  public deleteUser(id: number) {
    return this.httpclient.delete(this.PATH_OF_API + '/deleteUser?id=' + id, { headers: this.reqHdr });
  }

  public updateUser(user: any){
    return this.httpclient.put(this.PATH_OF_API + '/updateUser', user, { headers: this.reqHdr });
  }
}

