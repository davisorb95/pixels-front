import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(public http: HttpClient) { }

  goCheckOut(preference: any): any {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(`${environment.apiUrl}/mercadopago`, preference)
        .subscribe(
          response => {
            resolve(response);
          },
          err => {
            reject(err);
          }
        );
    });
  }

}
