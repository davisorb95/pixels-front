import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(public http: HttpClient) { }

  getMedia(): any {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(`${environment.apiUrl}/media/one`)
        .subscribe(
          response => {
            resolve(response.media);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getMediaPercentage(): any {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(`${environment.apiUrl}/media/one/percentage`)
        .subscribe(
          response => {
            resolve(response.percentage);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
