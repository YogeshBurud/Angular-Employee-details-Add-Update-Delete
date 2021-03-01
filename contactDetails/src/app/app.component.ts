import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ContactDetails } from './_model/contactDetals'

import { DialogBoxComponent } from './dialog-box/dialog-box.component';

const ELEMENT_DATA: ContactDetails[] = [
  { id: 1, FirstName: 'raj', LastName: 'patil', Email: 'rp@gmail.com', PhoneNumber: 9175893905, Status: 'Inacitve' },
  { id: 2, FirstName: 'raj', LastName: 'patil', Email: 'rp@gmail.com', PhoneNumber: 9175893905, Status: 'active' },
  { id: 3, FirstName: 'raj', LastName: 'patil', Email: 'rp@gmail.com', PhoneNumber: 9175893905, Status: 'Inacitve' }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  displayedColumns: string[] = ['id', 'FirstName', 'LastName', 'Email', 'PhoneNumber', 'Status', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;


  constructor(public dialog: MatDialog) { }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '40%',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj) {
    var totalRows = this.dataSource.length + 1;
    this.dataSource.push({
      id: totalRows,
      FirstName: row_obj.FirstName,
      LastName: row_obj.LastName,
      Email: row_obj.Email,
      PhoneNumber: row_obj.PhoneNumber,
      Status: row_obj.status
    });
    this.table.renderRows();

  }
  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.FirstName = row_obj.FirstName;
        value.LastName = row_obj.LastName;
        value.Email = row_obj.Email;
        value.PhoneNumber = row_obj.PhoneNumber;
        value.Status = row_obj.Status;
      }
      return true;
    });
  }
  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }


}
