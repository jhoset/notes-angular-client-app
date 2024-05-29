import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddEditNoteComponent} from "../add-edit-note/add-edit-note.component";
import {ConfirmationComponent} from "../confirmation/confirmation.component";
import {NoteDto} from "../../models/note.dto";
import {NoteService} from "../../../../core/services/note.service";
import {CommonNotesService} from "../../services/common-notes.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {

  @Input({required: true}) note!: NoteDto;

  constructor(public _dialog: MatDialog,
              public _noteService: NoteService,
              public _super: CommonNotesService,
              public _snackBar: MatSnackBar) {
  }

  onEdit() {
    const dialogRef = this._dialog.open(AddEditNoteComponent, {
      data: this.note,
      width: '575px',
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.displayNotification('Success: Note Updated');
      }
    });
  }

  onDelete() {
    const dialogRef = this._dialog.open(ConfirmationComponent, {
      data: this.note,
      width: '475px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const filtered = this._super.noteList$.value.filter(note => note.id !== this.note.id);
        this._super.noteList$.next(filtered);
        this._super.updateActiveArchivedList()
        this.displayNotification('Success: Note Deleted');
      }
    });
  }

  onArchive() {
    this._noteService.updateNoteStatus(this.note.id, false).subscribe(rs => {
      if (rs) {
        this.displayNotification('Success: Note Archived');
        this.note.isActive = false;
        this._super.updateActiveArchivedList()
      }
    })
  }

  onUnArchive() {
    this._noteService.updateNoteStatus(this.note.id, true).subscribe(rs => {
      if (rs) {
        this.displayNotification('Success: Note Activated')
        this.note.isActive = true;
        this._super.updateActiveArchivedList()
      }
    })
  }

  public displayNotification(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    })
  }

}
