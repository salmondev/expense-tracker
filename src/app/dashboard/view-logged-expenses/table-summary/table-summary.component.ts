import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Expense } from "../../../shared/models/expense-model";

import { ManageExpenseComponent } from '../../manage-expense/manage-expense.component';

@Component({
  selector: 'app-table-summary',
  templateUrl: 'table-summary.component.html',
  styleUrls: ['table-summary.component.scss']
})
export class TableSummaryComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {read: true}) sort: MatSort;
  @Input() data: Expense[] = [];
  @Input() displayColumns: string[] = ['name', 'amount', 'date', 'category', 'type', 'comments'];

  expensesData = new MatTableDataSource<Expense>();


  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.expensesData = new MatTableDataSource<Expense>(this.data);
    this.expensesData.paginator = this.paginator;
    this.expensesData.sort = this.sort;
  }

  ngOnChanges(changes: any) {
    if (!changes.data.firstChange) {
      this.expensesData = new MatTableDataSource<Expense>(this.data);
      this.expensesData.paginator = this.paginator;
      this.expensesData.sort = this.sort;
    }
  }

  isDataEmpty(): boolean {
    return this.data.length === 0;
  }

  editData(expense: any) {
    console.log(expense);
    let dialogRef = this.dialog.open(ManageExpenseComponent, {
      data: expense as any,
      hasBackdrop: true,
      disableClose: true,
    });
  }
}