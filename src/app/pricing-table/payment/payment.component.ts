import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CheckoutService} from '../../services/checkout.service';
import {get} from 'scriptjs';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {PaymentService} from "../../services/payment.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payment: any;
  preference: any = {};
  initPoint: any;
  mercadoPagoForm;
  image: File;
  file;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  tempImg: string | ArrayBuffer;
  imageForm: FormGroup;
  loadImage: any = false;
  details: any;
  userExists = false;


  @ViewChild('paypalRef', {static: true}) private paypalRef: ElementRef;

  constructor(private router: Router,
              public dialogRef: MatDialogRef<PaymentComponent>,
              private checkoutService: CheckoutService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private paymentService: PaymentService,
              @Inject(MAT_DIALOG_DATA) data) {
    this.payment = data.payment;
    this.imageForm = this.formBuilder.group({
      image: ['', [Validators.required]]
    });
    this.mercadoPagoForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''],
      web: [''],
    });
    this.preference = {
      items: [
        {
          title: this.payment.numberCoins + ' pixels',
          unit_price: this.payment.numberCoins,
          currency_id: this.payment.currency,
          quantity: 1,
        }
      ],
      back_urls: {
        success: 'http://localhost:4200/#/payments/success',
        failure: 'http://localhost:4200/#/payments/failure',
        pending: 'http://localhost:4200/#/payments/pending'
      },
      auto_return: 'approved',
    };
  }

  ngOnInit(): void {
    get('https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js', () => {
      // library has been loaded...
    });
    window.paypal.Buttons({
      style: {
        size: 'responsive',
        height: 40,
        layout: 'horizontal',
        color: 'blue',
        label: 'paypal'
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.payment.pay,
                currency_code: this.payment.currency
              },
              description: this.payment.numberCoins + ' Pixels',
            }
          ]
        });
      },
      onCancel: (data, actions) => {
        Swal.fire(
          'Payment',
          'You canceled the payment please try to pay again',
          'warning'
        );
      },
      onError: err => {
        Swal.fire(
          'Payment',
          err,
          'error'
        );
      },
      onApprove: (data, actions) => {
        // This function captures the funds from the transaction.
        return actions.order.capture().then((details: any) => {
          // This function shows a transaction success message to your buyer.
          Swal.fire({
            title: 'Payment',
            text: 'Transaction completed by ' + details.payer.name.given_name + '.',
            icon: 'success',
          }).then((result: any) => {
            details.infoData = {
              type: 'paypal',
              name: this.mercadoPagoForm.value.name,
              email: this.mercadoPagoForm.value.email,
              web: this.mercadoPagoForm.value.web,
              file: this.image
            };
            this.dialogRef.close(details);
          });
        });
      }
    }).render(this.paypalRef.nativeElement);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async goToPayment(): Promise<void> {
    window.location.href = 'www.google.com.co';
  }

  onBuy(): any {
    const newUser = {
      name: this.mercadoPagoForm.value.name,
      email: this.mercadoPagoForm.value.email,
      web: this.mercadoPagoForm.value.web,
      createAt: new Date(),
      updateAt: new Date()
    };
    this.userService.postUser(newUser, this.image).then((response1: any) => {
      this.preference.userId = response1.data._id;
      this.checkoutService.goCheckOut(this.preference).then(result => {
        console.log(result);
        // Read result of the Cloud Function.
        this.initPoint = result.data.body.sandbox_init_point;
        window.location.href = this.initPoint;
      }).catch(error => {
        return error;
      });
    });
  }

  changeEmail(email: string): void {
    this.userService.getUserByEmail(email).then(user => {
      this.userExists = false;
      if (!!user) {
        this.userExists = true;
        this.mercadoPagoForm.controls.name.setValue(user.name);
        this.mercadoPagoForm.controls.web.setValue(user.web);
      }
    });
  }

  onImageChange(file): void {
    let isImage = false;
    if (file) {
      if (file.type.indexOf('image') >= 0) {
        isImage = true;
      }
    }
    if (isImage) {
      this.imageForm.controls.image.setErrors(null);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => (this.tempImg = reader.result);
    } else {
      this.imageForm.controls.image.setErrors({valid: false});
      this.image = null;
    }
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    const file = this.dataURLtoFile(this.croppedImage, 'image.png');
    this.image = file;
  }

  dataURLtoFile(dataurl, filename): File {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
}
