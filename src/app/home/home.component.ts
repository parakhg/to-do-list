import { Component, OnInit, Inject } from '@angular/core';
import { ToDoListService } from '../to-do-list.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todoLists: any = [];
  selectedList: any;
  constructor(private toDoService: ToDoListService,
    public dialog: MatDialog) { }

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
    const dialogRef = this.dialog.open(AddDialog, {
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
      console.log("Deleted successfully ", resp);
      this.getToDoLists();
    },
      err => {
        console.log(err);
      });
  }
}

@Component({
  selector: 'add-dialog',
  templateUrl: './add-dialog.html',
  styleUrls: ['./add-dialog.css']
})
export class AddDialog {
  constructor(public dialogRef: MatDialogRef<AddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toDoService: ToDoListService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createList() {
    const payload = { name: this.data.value };
    this.toDoService.createToDoList(payload).subscribe(resp => {
      console.log("List created successfully ", resp);
      this.dialogRef.close('Success');
    },
      err => {
        console.log(err);
      });
  }

  updateList() {
    const payload = { name: this.data.value };
    this.toDoService.updateList(this.data.listId, payload).subscribe(resp => {
      console.log("List updated successfully ", resp);
      this.dialogRef.close('Success');
    },
      err => {
        console.log(err);
      });
  }
}
