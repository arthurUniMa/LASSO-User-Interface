import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface RepositoryData {
  name: string;
  workspace: string;
  owner: string;
}

const ELEMENT_DATA: RepositoryData[] = [
  {name: 'Base64 Java', workspace: 'Base64_Java-workspace', owner: 'LASSOMaster5000'},
  {name: 'CPU Resource', workspace: 'CPU_Resource-workspace', owner: 'Cowboy123'},
  {name: 'Base32 Python', workspace: 'Base32_Python-workspace', owner: 'RepoHunter99'},
  {name: 'LSL4', workspace: 'LSL4-workspace', owner: 'LASSOMaster5000'},
  {name: 'LSL5', workspace: 'LSL5-workspace', owner: 'Cowboy123'},
  {name: 'LSL6', workspace: 'LSL6-workspace', owner: 'Cowboy123'},
  {name: 'LSL7', workspace: 'LSL7-workspace', owner: 'LASSOMaster5000'},
  {name: 'LSL8', workspace: 'LSL8-workspace', owner: 'RepoHunter99'},
  {name: 'LSL9', workspace: 'LSL9-workspace', owner: 'RepoHunter99'},
  {name: 'LSL10', workspace: 'LSL10-workspace', owner: 'LASSOMaster5000'},
];

/**
 * Each node has a name and an optiona list of children.
 */
interface ExampleWorkspace {
  name: string;
  children?: ExampleWorkspace[];
}

const EXAMPLE_TREE_DATA: ExampleWorkspace[] = [
  {
    name: 'Example Workspace 1',
    children: [
      {name: 'Results'},
      {name: 'SRM'},
    ]
  }, 
  {
    name: 'Example Workspace 2',
    children: [
      {name: 'Results'},
      {name: 'SRM'},
    ]
  },
  {
    name: 'Example Workspace 3',
    children: [
      {name: 'Results'},
      {name: 'SRM'},
    ]
  },
];


interface Workspace {
  name: string;
  children?: Workspace[];
}

const REPOSITORY_TREE_DATA: Workspace[] = [
  {
    name: 'Example Workspace 1',
    children: [
      {name: 'Results'},
      {name: 'SRM'},
    ]
  }, 
];


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
    templateUrl: './repository.component.html',
})

export class RepositoryComponent implements OnInit {
    pageTitle = 'Repository Tab';
    displayedColumns: string[] = ['name', 'workspace', 'owner'];
    dataSource = new MatTableDataSource<RepositoryData>(ELEMENT_DATA);

     constructor(public dialog: MatDialog) {}
 

    openExampleWorkspaceDialog() {
      const dialogRef = this.dialog.open(ExampleWorkspaceDialogContent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    openWorkspaceDialog() {
      const dialogRef = this.dialog.open(WorkspaceDialogContent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

   @ViewChild(MatSort, { static: true }) sort: MatSort;

   ngOnInit() {
     this.dataSource.sort = this.sort;
   }
}


@Component({
  templateUrl: 'example-workspace-dialog.html',
})
export class ExampleWorkspaceDialogContent{
  private _transformer = (node: ExampleWorkspace, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = EXAMPLE_TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

@Component({
  templateUrl: 'workspace-dialog.html',
})
export class WorkspaceDialogContent{
  private _transformer = (node: Workspace, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = REPOSITORY_TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

















