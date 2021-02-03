import {Component, OnInit} from '@angular/core';
import {Donor} from '../../models/Donor';
import {DONORS} from '../../assets/data/donors';
import {compareDates} from '../../utils/utils';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.css']
})
export class DonorsComponent implements OnInit {
  public donors: Donor[] = [];
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor() {
  }

  ngOnInit(): void {
    this.donors = DONORS.sort(compareDates);
  }

}
