import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    formdata.append('first_name', username);
    formdata.append('username', email);
    formdata.append('password1', password1);
    formdata.append('password2', password2);
    formdata.append('email', email);
    return lastValueFrom(this.http.post(url, formdata));
  }

  public checkToken(token: string | any) {
    const url = environment.apiUrl + '/check_token/';
    return lastValueFrom(this.http.get(url + '?token=' + token));
  }

  public resetPassword(email: string) {
    const url = environment.apiUrl + '/reset_password/';
    const body = {
      email: email,
    };
    return lastValueFrom(this.http.post(url, body));
  }

  public resetPasswordSave(password: string, token: string) {
    const url = environment.apiUrl + '/change_password/';
    const body = {
      password: password,
      token: token,
    };
    return lastValueFrom(this.http.post(url, body));
  }

  public deleteUser(token: string) {
    const url = environment.apiUrl + '/delete_current_user/';
    const body = {};
    const headers = new HttpHeaders({
      Authorization: 'token ' + token,
    });
    console.log(body, headers);
    return lastValueFrom(this.http.post(url, body, { headers }));
  }

  public loadProfilData() {
    const url = environment.apiUrl + '/profile/';
    return lastValueFrom(this.http.get(url));
  }

  public loadEmail() {
    const url = environment.apiUrl + '/account_change_mail/';
    return lastValueFrom(this.http.get(url));
  }

  public saveProfilData(
    name: string,
    selected_language: string,
    checked: boolean,
    selectedAge: number
  ) {
    var formdata: any = new FormData();
    formdata.append('age_rating', selectedAge);
    formdata.append('automatic_playback', checked);
    formdata.append('language', selected_language);
    formdata.append('name', name);
    const url = environment.apiUrl + '/profile/';
    return lastValueFrom(this.http.put(url, formdata));
  }

  public resetPasswordAcc(
    current_password: string,
    new_password: string | any
  ) {
    const url = environment.apiUrl + '/change_password_acc/';
    var formdata: any = new FormData();
    formdata.append('current_password', current_password);
    formdata.append('new_password', new_password);
    return lastValueFrom(this.http.put(url, formdata));
  }

  public resetMailAcc(new_email: any) {
    const url = environment.apiUrl + '/account_change_mail/';
    var formdata: any = new FormData();
    formdata.append('new_email', new_email);
    formdata.append('new_username', new_email);
    return lastValueFrom(this.http.put(url, formdata));
  }

  public loadMovies(key: String) {
    const url = environment.apiUrl + '/movies/?select=' + key;
    return lastValueFrom(this.http.get(url));
  }

  public loadPreview(genre: String) {
    const url = environment.apiUrl + '/preview/?select=' + genre;
    return lastValueFrom(this.http.get(url));
  }
}
