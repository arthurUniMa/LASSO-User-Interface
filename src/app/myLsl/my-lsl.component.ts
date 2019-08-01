import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface RepositoryData {
  name: string;
  workspace: string;
  status: string;
}

const ELEMENT_DATA: RepositoryData[] = [
  { name: 'Base64 Java', workspace: '--NO WORKSPACE--', status: 'draft' },
  { name: 'CPU Resource Java', workspace: '--NO WORKSPACE--', status: 'failed' },
  { name: 'Base32 Python', workspace: 'Base32_Python-workspace', status: 'successful' },
  { name: 'LSL4', workspace: '--NO WORKSPACE--', status: 'pending' },
  { name: 'LSL5', workspace: '--NO WORKSPACE--', status: 'pending' },
  { name: 'LSL6', workspace: '--NO WORKSPACE--', status: 'draft' },
  { name: 'LSL7', workspace: '--NO WORKSPACE--', status: 'draft' },
  { name: 'LSL8', workspace: 'LSL8-workspace', status: 'successful' },
  { name: 'LSL9', workspace: '--NO WORKSPACE--', status: 'failed' },
  { name: 'LSL10', workspace: '--NO WORKSPACE--', status: 'failed' },
];

@Component({
  templateUrl: './my-lsl.component.html',
  selector: 'my-lsl.component'
})

export class MyLslComponent implements OnInit {
  pageTitle = 'My LSL Tab';
  displayedColumns: string[] = ['select', 'name', 'workspace', 'status'];
  dataSource = new MatTableDataSource<RepositoryData>(ELEMENT_DATA);
  selection = new SelectionModel<RepositoryData>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: RepositoryData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }
}