import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, of } from "rxjs";
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @Input() userFormValues;
  userList$: Observable<Element[]> = this.getUserListData();
  displayedColumns = ['select', 'firstname', 'lastname', 'dob', 'gender', 'email'];

  data = Object.assign(this.localStorageService.getUserLocalData());
  dataSource = new MatTableDataSource<Element>(this.data);
  selection = new SelectionModel<Element>(true, []);
  constructor(public localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    // this.userList$ = this.getUserListData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userFormValues.currentValue) {
      this.data.push(changes.userFormValues.currentValue);
      this.dataSource = this.data;
    }
    // console.log(changes.value.currentValue);
  }

  getUserListData(): Observable<Element[]>{
    return of(this.localStorageService.getUserLocalData());
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      console.log(this.data.findIndex(d => d === item));
      this.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Element>(this.data);
    });
    this.selection = new SelectionModel<Element>(true, []);
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

export interface Element {
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
  dob: Date;
}