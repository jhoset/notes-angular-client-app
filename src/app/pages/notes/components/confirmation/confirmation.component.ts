import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NoteService} from "../../../../core/services/note.service";
import {data} from "autoprefixer";
import {NoteDto} from "../../models/note.dto";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
  public loading: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: NoteDto,
              private _dialogRef: MatDialogRef<ConfirmationComponent>,
              private _noteService: NoteService
  ) {
  }

  onConfirm() {
    this.loading = true;
    this._noteService.deleteNote(this.data.id).subscribe(rs => {
      this.loading = false;
      if (rs) {
        this._dialogRef.close("OK");
      }
    })


  }

  onClose() {
    this._dialogRef.close(null)
  }
}
