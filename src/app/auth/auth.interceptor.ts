import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserAuthService } from "../services/user-auth.service";
import { Router } from "@angular/router";

export class AuthInterceptor implements HttpInterceptor{

  constructor(private userAuthService: UserAuthService,
    private router:Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.headers.get('No-Auth') == "True"){
      return next.handle(req.clone());
    }
    const token = this.userAuthService.getToken();

    req = this.addToken(req, token);
      // add token to request if present
    return next.handle(req).pipe(
      catchError(
        (err:HttpErrorResponse) => {
          console.log(err.status);
          if (err.status === 401){
            this.userAuthService.clear();
            this.router.navigate(['/login']);
          }else if(err.status === 403){
            this.router.navigate(['/forbidden']);
          }
          console.error('An error occurred:', err);
          return throwError(() => err);
        }
      )
    )
}
  private addToken(req: HttpRequest<any>, token: string){
    // Clone the request and set the authorization header
    return req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
