import {Component, OnInit} from '@angular/core';
import {Price} from '../../models/Price';
import {PricingType} from '../../utils/enums';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PaymentComponent} from './payment/payment.component';
import {UploadImageComponent} from './upload-image/upload-image.component';
import {UserService} from '../services/user.service';
import {PaymentService} from '../services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pricing-table',
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.css']
})
export class PricingTableComponent implements OnInit {
  public pricesList: Price[] = [];
  public pricingType = PricingType;
  public priceSelected = false;
  public priceSelectedVar: any = {};

  constructor(private router: Router,
              public userService: UserService,
              public paymentService: PaymentService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.pricesList = [
      {
        btnStyle: 'btn-main',
        currency: 'USD',
        descriptionList: [
          '10 pixeles por compra',
          'Mención de aporte en la página',
          'Disfruta desbloquear el video'
        ],
        icon: 'fa-user-friends',
        numberCoins: 10,
        pay: 10,
        style: 'price1',
        title: 'El Acuario'
      },
      {
        btnStyle: 'btn-seconder',
        currency: 'USD',
        descriptionList: [
          '100 pixeles por compra',
          'Mención de aporte en la página',
          'Disfruta desbloquear el video'
        ],
        icon: 'fa-users',
        numberCoins: 100,
        pay: 100,
        style: 'price2',
        title: 'Johnny Cay'
      },
      {
        btnStyle: 'btn-tertiary',
        currency: 'USD',
        descriptionList: [
          '200 pixeles por compra',
          'Mención de aporte en la página',
          'Disfruta desbloquear el video'
        ],
        icon: 'fa-user',
        numberCoins: 200,
        pay: 200,
        style: 'price3',
        title: 'Siete Colores'
      }
    ];
  }

  async goToPay(price: Price): Promise<void> {
    this.priceSelectedVar = price;
    this.priceSelected = true;
    const dialogRef = this.dialog.open(PaymentComponent, {
      data: {payment: this.priceSelectedVar}
    });
    dialogRef.afterClosed().subscribe( (paymentData: any) => {
      let email: any;
      let newPayment: any;
      if (paymentData.infoData.type === 'paypal') {
        newPayment = {
          rate: paymentData.purchase_units[0].amount.value,
          state: paymentData.status,
          currency: paymentData.purchase_units[0].amount.currency_code,
          description: paymentData.purchase_units[0].description,
          transactionId: paymentData.id,
          logTransaction: paymentData,
          type: 'paypal',
          createAt: new Date(),
          updateAt: new Date()
        };
      }
      this.userService.getUserByEmail(paymentData.infoData.email)
        .then((response: any) => {
          if (response) {
            newPayment.userId = response._id;
            this.paymentService.postPayment(newPayment).then((response1: any) => {
              this.router.navigate(['']);
            });
          } else {
            const newUser = {
              name: paymentData.infoData.name,
              email: paymentData.infoData.email,
              web: paymentData.infoData.web,
              createAt: new Date(),
              updateAt: new Date()
            };
            Swal.fire({
              title: 'Payment',
              text: 'Pago exitoso',
              icon: 'success',
            }).then((result: any) => {
              this.userService.postUser(newUser, paymentData.infoData.file).then((response1: any) => {
                console.log(response1);
                newPayment.userId = response1.data._id;
                this.paymentService.postPayment(newPayment).then((response2: any) => {
                  this.router.navigate(['']);
                });
              });
            });
          }
        });
    });
  }

}
