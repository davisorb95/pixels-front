import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {
  FormBuilder,
  FormGroup, Validators
} from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  image: File;
  file;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  tempImg: string | ArrayBuffer;
  imageForm: FormGroup;
  loadImage: any = false;
  details: any;
  @ViewChild('paypalRef', {static: true}) private paypalRef: ElementRef;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<UploadImageComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.details = data.details;
  }

  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      image: ['', [Validators.required]]
    });
    console.log(this.details);
  }

  onImage(): void {
    if (this.imageForm.valid) {
      this.loadImage = true;
      Swal.fire(
        'Upload image',
        'Image uploaded successfully, you are now part of our list of donors',
        'success'
      );
      this.dialogRef.close(this.image);
    }
  }

  onImageChange(file): void {
    let isImage = false;
    if (file) {
      if (file.type.indexOf('image') >= 0) {
        isImage = true;
      }
    }
    if (isImage) {
      this.imageForm.controls['image'].setErrors(null);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => (this.tempImg = reader.result);
    } else {
      this.imageForm.controls['image'].setErrors({valid: false});
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

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
