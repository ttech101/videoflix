import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, lastValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public checkEmail(email: string) {
    const url = environment.apiUrl + '/login/' + '?email=' + email;
    return lastValueFrom(this.http.get(url));
  }

  public loginWithEmailAndPassword(email: string, passwort: any) {
    const url = environment.apiUrl + '/login/';
    var formdata = new FormData();
    formdata.append('username', email);
    formdata.append('password', passwort);
    return lastValueFrom(this.http.post(url, formdata));
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
    return lastValueFrom(this.http.post(url, body, { headers }));
  }

  public loadProfilData() {
    const url = environment.apiUrl + '/profile/';
    const headers = new HttpHeaders({
      Authorization: 'token ' + localStorage.getItem('authToken'),
    });
    return lastValueFrom(this.http.get(url, { headers }));
  }

  public loadEmail() {
    const url = environment.apiUrl + '/account_change_mail/';
    const headers = new HttpHeaders({
      Authorization: 'token ' + localStorage.getItem('authToken'),
    });
    return lastValueFrom(this.http.get(url, { headers }));
  }

  public saveProfilData(
    name: string,
    selected_language: string,
    checked: boolean,
    selectedAge: number
  ) {
    const headers = new HttpHeaders({
      Authorization: 'token ' + localStorage.getItem('authToken'),
    });
    var formdata: any = new FormData();
    formdata.append('age_rating', selectedAge);
    formdata.append('automatic_playback', checked);
    formdata.append('language', selected_language);
    formdata.append('name', name);
    const url = environment.apiUrl + '/profile/';
    return lastValueFrom(this.http.put(url, formdata, { headers }));
  }

  public resetPasswordAcc(
    current_password: string,
    new_password: string | any
  ) {
    const headers = new HttpHeaders({
      Authorization: 'token ' + localStorage.getItem('authToken'),
    });
    const url = environment.apiUrl + '/change_password_acc/';
    var formdata: any = new FormData();
    formdata.append('current_password', current_password);
    formdata.append('new_password', new_password);
    return lastValueFrom(this.http.put(url, formdata, { headers }));
  }

  public resetMailAcc(new_email: any) {
    const headers = new HttpHeaders({
      Authorization: 'token ' + localStorage.getItem('authToken'),
    });
    const url = environment.apiUrl + '/account_change_mail/';
    var formdata: any = new FormData();
    formdata.append('new_email', new_email);
    formdata.append('new_username', new_email);
    return lastValueFrom(this.http.put(url, formdata, { headers }));
  }

  public loadMovies(key: String) {
    const url = environment.apiUrl + '/movies/?select=' + key;
    return lastValueFrom(this.http.get(url));
  }

  public loadPreview(genre: String) {
    const url = environment.apiUrl + '/preview/?select=' + genre;
    return lastValueFrom(this.http.get(url));
  }

  public loadEnvironment() {
    return environment.apiUrl;
  }

  public loadUploadKey() {
    const url = environment.apiUrl + '/create_movie/';
    return lastValueFrom(this.http.get(url));
  }

  public saveVideoData(form: any, key: string) {
    console.log(form);
    const url = environment.apiUrl + '/create_movie/';
    var formdata = new FormData();
    formdata.append('author', form.author);
    formdata.append('description', form.description);
    formdata.append('description_short', form.description_short);
    formdata.append('nature_check', this.resolutionGenreNature(form.genre));
    formdata.append('funny_check', this.resolutionGenreFunny(form.genre));
    formdata.append(
      'knowledge_check',
      this.resolutionGenreKnowledge(form.genre)
    );
    formdata.append('other_check', this.resolutionGenreOther(form.genre));
    formdata.append('movie_check', this.resolutionMovie(form.movie_check));
    formdata.append(
      'short_movie_check',
      this.resolutionSerie(form.movie_check)
    );
    formdata.append('genre', form.genre);
    formdata.append('movie_name', form.movie_name);
    formdata.append('selectedAge', form.selectedAge);
    formdata.append(
      'upload_visible_check',
      this.resolutionRightWrong(form.upload_visible_check)
    );
    formdata.append('video_length', form.video_length);
    formdata.append('upload_key', key);
    return lastValueFrom(this.http.post(url, formdata));
  }

  public changeVideoData(form: any, key: string) {
    console.log(form);
    const url = environment.apiUrl + '/create_movie/';
    var formdata = new FormData();
    formdata.append('author', form.author);
    formdata.append('description', form.description);
    formdata.append('description_short', form.description_short);
    formdata.append('nature_check', this.resolutionGenreNature(form.genre));
    formdata.append('funny_check', this.resolutionGenreFunny(form.genre));
    formdata.append(
      'knowledge_check',
      this.resolutionGenreKnowledge(form.genre)
    );
    formdata.append('other_check', this.resolutionGenreOther(form.genre));
    formdata.append('movie_check', this.resolutionMovie(form.movie_check));
    formdata.append(
      'short_movie_check',
      this.resolutionSerie(form.movie_check)
    );
    formdata.append('genre', form.genre);
    formdata.append('movie_name', form.movie_name);
    formdata.append('selectedAge', form.selectedAge);
    formdata.append(
      'upload_visible_check',
      this.resolutionRightWrong(form.upload_visible_check)
    );
    formdata.append('video_length', form.video_length);
    formdata.append('upload_key', key);
    return lastValueFrom(this.http.put(url, formdata));
  }

  resolutionGenreOther(genre: string) {
    if (genre == 'other') {
      return 'True';
    } else {
      return 'False';
    }
  }

  resolutionGenreKnowledge(genre: string) {
    if (genre == 'knowledge') {
      return 'True';
    } else {
      return 'False';
    }
  }

  resolutionGenreFunny(genre: string) {
    if (genre == 'funny') {
      return 'True';
    } else {
      return 'False';
    }
  }

  resolutionGenreNature(genre: string) {
    if (genre == 'nature') {
      return 'True';
    } else {
      return 'False';
    }
  }

  resolutionMovie(movie: string) {
    if (movie == 'movie') {
      return 'True';
    } else {
      return 'False';
    }
  }

  resolutionSerie(movie: string) {
    if (movie == 'serie') {
      return 'True';
    } else {
      return 'False';
    }
  }

  resolutionRightWrong(set: boolean) {
    if (set == true) {
      return 'True';
    } else {
      return 'False';
    }
  }

  public setWatchlist(key: string) {
    const url = environment.apiUrl + '/watchlist/';
    var formdata = new FormData();
    formdata.append('key', key);
    return lastValueFrom(this.http.post(url, formdata));
  }

  public getWatchlist() {
    const url = environment.apiUrl + '/watchlist/';
    return lastValueFrom(this.http.get(url));
  }

  public deleteWatchlist(key: string) {
    const url = `${environment.apiUrl}/watchlist/`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { key: key }, // Send key in the request body
    };
    return lastValueFrom(this.http.delete(url, options));
  }

  public checkwachlist(key: string) {
    const url = environment.apiUrl + '/checkwachlist/?select=' + key;
    return lastValueFrom(this.http.get(url));
  }

  public deleteVideo(key: string) {
    const url = `${environment.apiUrl}/delete_movie/`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'token ' + localStorage.getItem('authToken'),
      }),
      body: { random_key: key }, // Send key in the request body
    };
    return lastValueFrom(this.http.delete(url, options));
  }
}
