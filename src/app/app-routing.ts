import {Routes} from '@angular/router';
import {PricingTableComponent} from './pricing-table/pricing-table.component';
import {HomeComponent} from './home/home.component';
import {DonorsComponent} from './donors/donors.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'payments/:status',
    component: HomeComponent
  },
  {
    path: 'pricing-table',
    component: PricingTableComponent
  },
  {
    path: 'donors',
    component: DonorsComponent
  }
];

