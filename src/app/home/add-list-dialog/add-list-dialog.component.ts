import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToDoListService } from '../../to-do-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSnackBarComponent } from "../snack-bar.component";

@Component({
    selector: 'add-dialog',
    templateUrl: './add-list-dialog.component.html',
    styleUrls: ['./add-list-dialog.component.css']
})
export class AddListDialogComponent {
    constructor(public dialogRef: MatDialogRef<AddListDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toDoService: ToDoListService,
        private _snackBar: MatSnackBar) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    createList() {
        const payload = { name: this.data.value };
        this.toDoService.createToDoList(payload).subscribe(resp => {
            this.openSnackBar('List created successfully');
            this.dialogRef.close('Success');
        },
            err => {
                console.log(err);
            });
    }

    updateList() {
        const payload = { name: this.data.value };
        this.toDoService.updateList(this.data.listId, payload).subscribe(resp => {
            this.openSnackBar('List updated successfully');
            this.dialogRef.close('Success');
        },
            err => {
                console.log(err);
            });
    }

    openSnackBar(message) {
        this._snackBar.openFromComponent(AppSnackBarComponent, {
            data: message,
            duration: 5000,
        });
    }
}