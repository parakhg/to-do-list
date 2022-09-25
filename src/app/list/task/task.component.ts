import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToDoListService } from 'src/app/to-do-list.service';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSnackBarComponent } from '../snack-bar.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnChanges {

  @Input() listId: number;
  @Input() todoLists: any = [];
  taskList: any = [];

  constructor(private toDoService: ToDoListService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnChanges(changes: SimpleChanges) {
    const changed = changes && changes.listId;
    if (changed) {
      this.getTaskByListId();
    } else {
      this.getAllTasks();
    }
  }

  getTaskByListId() {
    this.toDoService.getTasksByListId(this.listId).subscribe(resp => {
      this.taskList = resp;
    },
      err => {
        console.log(err);
      });
  }

  getAllTasks() {
    this.toDoService.getAllTasks().subscribe(resp => {
      this.taskList = resp;
    },
      err => {
        console.log(err);
      });
  }

  deleteTask(task) {
    this.toDoService.deleteTask(task.list_id, task.id).subscribe(() => {
      this.openSnackBar('Task deleted successfully');
      if (this.listId) {
        this.getTaskByListId();
      } else {
        this.getAllTasks();
      }
    },
      err => {
        console.log(err);
      });
  }

  updateTask(task, completed) {
    const payload = { name: task.name, completed: completed, listId: task.list_id };
    this.toDoService.updateTask(task.list_id, task.id, payload).subscribe(() => {
      if (this.listId) {
        this.getTaskByListId();
      } else {
        this.getAllTasks();
      }
      this.openSnackBar(`Task marked as ${completed ? 'complete' : 'uncomplete'}`);
    },
      err => {
        console.log(err);
      });
  }

  openEditTaskDialog(task) {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '400px',
      data: {
        action: 'edit',
        type: 'Task',
        value: task.name,
        todoLists: this.todoLists,
        task: task
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Success') {
        if (this.listId) {
          this.getTaskByListId();
        } else {
          this.getAllTasks();
        }
      }
    });
  }

  openSnackBar(message) {
    this._snackBar.openFromComponent(AppSnackBarComponent, {
      data: message,
      duration: 3000,
    });
  }
}
