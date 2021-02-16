import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, of } from "rxjs";
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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
  
  constructor(public localStorageService: LocalStorageService,
    public dialog: MatDialog) { }

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

  deleteRow(index: number) { // delete table row
    this.data.splice(index, 1);
    this.dataSource = new MatTableDataSource<Element>(this.data);
    this.localStorageService.updateStorage(this.data);
  }

  confirmDialog(index: number) : void { // delete table row
    const message = `Are you sure you want to delete this ?`;

    const dialogData = new ConfirmDialogModel("Delete Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteRow(index);
      }
    });
  }
}

export interface Element {
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
  dob: Date;
}