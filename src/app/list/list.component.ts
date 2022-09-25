import { Component, OnInit, ViewChild } from '@angular/core';
import { ToDoListService } from '../to-do-list.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddListDialogComponent } from './add-list-dialog/add-list-dialog.component';
import { AppSnackBarComponent } from './snack-bar.component';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  todoLists: any = [];
  selectedList: any;
  listId: number;
  // @ViewChild('taskComp', { static: false }) public taskComp: TaskComponent;
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
      this.listId = this.todoLists.filter(list => list.name === this.selectedList)[0].id;
    },
      err => {
        console.log(err);
      });
  }

  openAddEditDialog(action) {
    const dialogRef = this.dialog.open(AddListDialogComponent, {
      width: '400px',
      data: {
        action: action,
        type: 'List',
        value: action === 'edit' ? this.selectedList : '',
        listId: this.listId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Success') { this.getToDoLists(); }
    });
  }

  deleteList() {
    this.toDoService.deleteList(this.listId).subscribe((resp) => {
      this.openSnackBar('List deleted successfully');
      this.getToDoLists();
    },
      err => {
        console.log(err);
      });
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '400px',
      data: {
        action: 'add',
        type: 'Task',
        value: '',
        todoLists: this.todoLists
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Success') {
        this.getToDoLists();
      }
    });
  }

  onListChange(selectedList) {
    this.listId = this.todoLists.filter(list => list.name === selectedList)[0].id;
  }

  openSnackBar(message) {
    this._snackBar.openFromComponent(AppSnackBarComponent, {
      data: message,
      duration: 3000,
    });
  }
}
