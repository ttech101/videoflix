import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private formData: any;
  name: string = '';
  avatar: string = '';
  save_profil: boolean = false;

  getUser() {
    return localStorage.getItem('name');
  }

  setFormData(data: any) {
    this.formData = data;
  }

  getFormData() {
    return this.formData;
  }

  trueOrFalse(a: boolean) {
    if (a) {
      return 'True';
    } else {
      return 'False';
    }
  }
}
