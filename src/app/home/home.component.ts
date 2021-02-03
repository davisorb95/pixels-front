import {Component, OnInit, ViewChild} from '@angular/core';
import {PlyrComponent} from 'ngx-plyr';
import {TranslateService} from '@ngx-translate/core';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {PaymentService} from '../services/payment.service';
import * as Plyr from 'Plyr';
import {MediaService} from '../services/media.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Donor} from '../../models/Donor';
import {DONORS} from '../../assets/data/donors';
import {compareContributes, compareDates} from '../../utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;
  public activeLang = 'es';
  media: any = '';
  mediaUpdated = '';
  percentage = 0;

  public topDonors: Donor[] = [];
  public latestDonors: Donor[] = [];
  public topPageSizeOptions: number[] = [25];
  public latestPageSizeOptions: number[] = [5, 10, 25, 100];

// or get it from plyrInit event
  player: Plyr;

  videoSources: Plyr.Source[] = [
    {
      src: 'assets/videos/video.mp4',
      type: 'video/mp4',
    }
  ];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private paymentService: PaymentService,
              private mediaService: MediaService,
              private sanitizer: DomSanitizer,
              private translate: TranslateService) {
    this.translate.setDefaultLang(this.activeLang);
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (!!queryParams.status) {
        this.paymentService.putPayment(queryParams).then(result => {
          if (queryParams.status === 'approved') {
            Swal.fire({
              title: 'Payment',
              text: 'Transaction completed.!',
              icon: 'success',
            }).then((result1: any) => {
              this.router.navigate(['/']);
            });
          } else {
            Swal.fire({
              title: 'Payment',
              text: 'Transaction ' + queryParams.status + '.!',
              icon: 'warning',
            }).then((result1: any) => {
              this.router.navigate(['/']);
            });
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.mediaService.getMedia().then((response) => {
      this.media = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/' + response.media);
      this.mediaUpdated = response.upadteAt;
    });
    this.mediaService.getMediaPercentage().then((response) => {
      this.percentage = response;
      console.log(this.percentage);
    });
    this.topDonors = [...DONORS].sort(compareContributes).splice(0, 25);
    this.latestDonors = [...DONORS].sort(compareDates);
  }

  played(event: Plyr.PlyrEvent): void {
    console.log('played', event);
  }

  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }

  async goToPrices(): Promise<void> {
    await this.router.navigate(['pricing-table']);
  }
}
