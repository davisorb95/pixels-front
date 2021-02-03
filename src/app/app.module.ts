import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PricingTableComponent} from './pricing-table/pricing-table.component';
import {RouterModule} from '@angular/router';
import {AppRoutes} from './app-routing';
import {CommonModule, DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {PaymentComponent} from './pricing-table/payment/payment.component';
import {PlyrModule} from 'ngx-plyr';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {DonorsComponent} from './donors/donors.component';
import {MatDialogModule} from '@angular/material/dialog';
import {UploadImageComponent} from './pricing-table/upload-image/upload-image.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {HeaderComponent} from './common/header/header.component';
import {DonorsTableComponent} from './donors/donors-table/donors-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    PricingTableComponent,
    HomeComponent,
    PaymentComponent,
    UploadImageComponent,
    DonorsComponent,
    HeaderComponent,
    DonorsTableComponent,
  ],
  imports: [
    MatDialogModule,
    CommonModule,
    RouterModule.forRoot(AppRoutes, {useHash: true}),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    PlyrModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
      }
    }),
    ImageCropperModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
