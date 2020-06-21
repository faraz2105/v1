import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
     return this.currentUserSubject.value;
   }

   login(phone: string, code: string) {
     return this.http.post<any>(`${environment.apiUrl}/${phone}/${code}`, {phone, code})
                      .pipe(map(user => {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                        return user;
                      }));
   }

   logout() {
     // remove user from local storage to log user out
     localStorage.removeItem('currentUser');
     this.currentUserSubject.next(null);
   }

}
