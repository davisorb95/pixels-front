import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(public http: HttpClient) { }

  postPayment(payment): any {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(`${environment.apiUrl}/payment`, payment)
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

  putPayment(payment): any {
    return new Promise((resolve, reject) => {
      this.http
        .put<any>(`${environment.apiUrl}/payment`, payment)
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
}
