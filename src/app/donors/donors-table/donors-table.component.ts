import {Component, OnInit, AfterViewInit, ViewChild, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Donor} from '../../../models/Donor';


@Component({
  selector: 'app-donors-table',
  templateUrl: './donors-table.component.html',
  styleUrls: ['./donors-table.component.css']
})
export class DonorsTableComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['photo', 'fullName', 'url', 'contribute'];
  public dataSource: MatTableDataSource<Donor>;
  public defaultPhoto: string;

  @Input() donors: Donor[] = [];
  @Input() pageSizeOptions: number[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  ngOnInit(): void {
    this.defaultPhoto = 'assets/images/user/user-none.png';
    this.dataSource = new MatTableDataSource(this.donors);
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Entradas por página';
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
