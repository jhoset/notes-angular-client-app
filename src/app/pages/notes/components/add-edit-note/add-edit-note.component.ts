import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ThemePalette} from "@angular/material/core";
import {ConfirmationComponent} from "../confirmation/confirmation.component";
import {AddCategoryComponent} from "../add-category/add-category.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {data} from "autoprefixer";
import {CommonNotesService} from "../../services/common-notes.service";
import {CategoryDto} from "../../models/category.dto";
import {NoteDto} from "../../models/note.dto";
import {NoteService} from "../../../../core/services/note.service";
import {CurrentUserService} from "../../../../core/services/current-user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-edit-note',
  templateUrl: './add-edit-note.component.html',
  styleUrl: './add-edit-note.component.scss'
})
export class AddEditNoteComponent {
  public loading: boolean = false;
  public noteFormGroup!: FormGroup;
  public categoriesSelected: CategoryDto[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: (NoteDto | null),
              private _dialogRef: MatDialogRef<AddEditNoteComponent>,
              public _dialog: MatDialog,
              public _super: CommonNotesService,
              public _noteService: NoteService,
              public _currentUserService: CurrentUserService,
              public _snackBar: MatSnackBar
  ) {

    this.noteFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    })
    this.initFormGroupForEdit();
  }

  public initFormGroupForEdit() {
    if (this.data) {
      this.titleControl.setValue(this.data.title);
      this.descriptionControl.setValue(this.data.description);
    }
  }

  public onSave() {
    if (this.noteFormGroup.invalid) return;
    this.loading = true;
    if (!this.data) {
      this.createNote()
    } else {
      this.updateNote()
    }

  }

  private createNote() {
    this._noteService.createNote({
      userId: this._currentUserService.user$.value?.id,
      ...this.noteFormGroup.value,
      categories: this.categoriesSelected
    }).subscribe(rs => {
      this.loading = false;
      if (rs) {
        setTimeout(() => {
          this._super.noteList$.next([rs, ...this._super.noteList$.value])
          this._super.updateActiveArchivedList();
          this._dialogRef.close(rs)
        }, 500)

      }
    })
  }

  private updateNote() {
    this._noteService.updateNote(this.data!.id, {
      ...this.noteFormGroup.value,
      categories: this.categoriesSelected
    }).subscribe(rs => {
      if (rs) {
        this.loading = false;
        const index = this._super.noteList$.value.findIndex(cat => cat.id === rs.id);
        setTimeout(() => {
          this._super.noteList$.value[index] = rs;
          this._super.updateActiveArchivedList();
          this._dialogRef.close(rs)
        }, 500)

      }
    })
  }


  public get titleControl(): FormControl {
    return this.noteFormGroup.get('title') as FormControl;
  }

  public get descriptionControl(): FormControl {
    return this.noteFormGroup.get('description') as FormControl;
  }

  isSelected(cat: CategoryDto) {
    if (!this.data) return false;
    if (this.data && !this.data.categories) return false;
    return !!this.data.categories?.find(c => c.id == cat.id)
  }


  onClose() {
    this._dialogRef.close(null)
  }

  onClickChip(event: any, categoryClicked: CategoryDto) {

    const selected = event.selected;
    if (selected) {
      this.categoriesSelected.push(categoryClicked);
    } else {
      this.categoriesSelected = this.categoriesSelected.filter(cat => cat.id !== categoryClicked.id);
    }
  }

  onAddCategory() {
    const dialogRef = this._dialog.open(AddCategoryComponent, {
      width: '475px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.displayNotification('Success: Category Created');
        this._super.categories$.next([...this._super.categories$.value, result])
      }
    });
  }

  public displayNotification(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    })
  }

}
