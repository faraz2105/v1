import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { User } from '../model/user';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private RequestCodeUrl = 'http://hares.aligh.io:2000/admin/user/requestCode/';
  private authorizeCodeUrl = 'http://hares.aligh.io:2000/admin/user/authorize/';

  httpOptions = {
    header: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',

    }),
  };

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  autheticationNumber(phone: string) {
    this.http
      .post(this.RequestCodeUrl + `${phone}`, {phone}).subscribe({
        // tslint:disable-next-line: no-shadowed-variable
        error: error => console.log('There was an error!', error)
      });
  }

  login(phone: string, code: string): Observable<User> {
    return this.http
      .post<User>(this.authorizeCodeUrl + `${phone}/${code}`, this.httpOptions)
      .pipe(map(user => {
        debugger;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }), catchError(() => {
        return throwError('Something wrong error');
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
