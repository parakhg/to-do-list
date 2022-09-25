import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToDoListService } from '../../to-do-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSnackBarComponent } from "../snack-bar.component";
@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})
export class AddTaskDialogComponent {

  selectedList: any;
  listId: number;
  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toDoService: ToDoListService,
    private _snackBar: MatSnackBar) {
      if(this.data.action === 'add') {
        this.selectedList = this.data.todoLists[0].name;
        this.listId = this.data.todoLists.filter(list => list.name === this.selectedList)[0].id;
      }
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createTask() {
    const payload = { name: this.data.value, completed: false };
    this.toDoService.createTask(this.listId, payload).subscribe(() => {
      this.openSnackBar('Task created successfully');
      this.dialogRef.close('Success');
    },
      err => {
        console.log(err);
      });
  }

  updateTask() {
    const payload = { name: this.data.value, completed: this.data.task.completed, listId: this.data.task.list_id };
    this.toDoService.updateTask(this.data.task.list_id, this.data.task.id, payload).subscribe(() => {
      this.openSnackBar('Task updated successfully');
      this.dialogRef.close('Success');
    },
      err => {
        console.log(err);
      });
  }

  onListChange(selectedList) {
    this.listId = this.data.todoLists.filter(list => list.name === selectedList)[0].id;
  }

  openSnackBar(message) {
    this._snackBar.openFromComponent(AppSnackBarComponent, {
      data: message,
      duration: 5000,
    });
  }
}
