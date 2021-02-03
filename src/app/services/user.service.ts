import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserModel} from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) {
  }

  getUserByEmail(email: string): any {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(`${environment.apiUrl}/user?email=${email}`)
        .subscribe(
          response => {
            resolve(response.users);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  postUser(user: any, file: File): any {
    return new Promise((resolve, reject) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log(xhr.response);
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', `${environment.apiUrl}/user`, true);

      const formData = new FormData();
      if (!!file) {
        formData.append('file', file, file.name);
      }
      if (!!user.name) {
        formData.append('name', user.name);
      }
      if (!!user.picture) {
        formData.append('picture', user.picture);
      }
      if (!!user.createAt) {
        formData.append('createAt', user.createAt);
      }
      if (!!user.updateAt) {
        formData.append('updateAt', user.updateAt);
      }
      if (!!user.email) {
        formData.append('email', user.email);
      }
      if (!!user.web) {
        formData.append('web', user.web);
      }
      xhr.send(formData);
    });
  }
}
