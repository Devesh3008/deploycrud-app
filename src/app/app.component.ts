import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEditComponentComponent } from './add-edit-component/add-edit-component.component';
import { MatDialog } from '@angular/material/dialog';
import { EmpolyeeService } from './services/empolyee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Crud-Application';
  displayedColumns: string[] = ['id','firstname', 'lastname', 'email', 'pincode', 'education', 'company','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empService: EmpolyeeService) { }
  ngOnInit(): void {
    this.getEmpolyeeList();
  }
  openAddEditEmpForm(): void {
   const dialogRef = this._dialog.open(AddEditComponentComponent);
   dialogRef.afterClosed().subscribe({
    next: (val) =>{
      this.getEmpolyeeList();
    }
   });
  
  }
  getEmpolyeeList(): void {
    this._empService.getEmpolyeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };
  deleteEmpolyee(id: any):void {
    this._empService.deleteEmpolyee().subscribe ({
      next: (res)=> {
        alert('empolyee deleted!');
        this.getEmpolyeeList();
      },
      error: console.log,

    });
  }
  openEditEmpForm(data:any): void {
    const _dialogRef =this._dialog.open(AddEditComponentComponent,{
      data,
    });

    _dialogRef .afterClosed().subscribe({
     next: (val: any) =>{
      if (val){
       this.getEmpolyeeList();
     }
    },
  
    });
    
    }
  }
