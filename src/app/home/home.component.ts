import { Component, OnInit } from '@angular/core';
import { ToDoListService } from '../to-do-list.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddListDialogComponent } from './add-list-dialog/add-list-dialog.component';
import { AppSnackBarComponent } from './snack-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todoLists: any = [];
  selectedList: any;
  constructor(private toDoService: ToDoListService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getToDoLists();
  }

  getToDoLists() {
    this.toDoService.getToDoLists().subscribe(resp => {
      this.todoLists = resp;
      this.selectedList = this.todoLists[0].name;
    },
      err => {
        console.log(err);
      });
  }

  openAddEditDialog(action) {
    const listId = this.todoLists.filter(list => list.name === this.selectedList)[0].id;
    const dialogRef = this.dialog.open(AddListDialogComponent, {
      width: '400px',
      data: {
        action: action,
        type: 'list',
        value: action === 'edit' ? this.selectedList : '',
        listId: listId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Success') { this.getToDoLists(); }
    });
  }

  deleteList() {
    const listId = this.todoLists.filter(list => list.name === this.selectedList)[0].id;
    this.toDoService.deleteList(listId).subscribe((resp) => {
      this.openSnackBar('List deleted successfully');
      this.getToDoLists();
    },
      err => {
        console.log(err);
      });
  }

  openSnackBar(message) {
    this._snackBar.openFromComponent(AppSnackBarComponent, {
      data: message,
      duration: 3000,
    });
  }
}
