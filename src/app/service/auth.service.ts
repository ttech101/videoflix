import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public loginWithEmailAndPassword(email: string, passwort: any) {
    const url = environment.apiUrl + '/login/';
    const body = {
      username: email,
      password: passwort,
    };
    return lastValueFrom(this.http.post(url, body));
  }

  public registerAccount(
    email: string,
    password1: string,
    password2: string,
    username: string
  ) {
    const url = environment.apiUrl + '/register/';
    var formdata = new FormData();
    formdata.append('username', username);
    formdata.append('password1', password1);
    formdata.append('password2', password2);
    formdata.append('email', email);
    return lastValueFrom(this.http.post(url, formdata));
  }
}
