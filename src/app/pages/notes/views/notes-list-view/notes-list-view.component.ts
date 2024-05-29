import {Component} from '@angular/core';
import {NoteService} from "../../../../core/services/note.service";
import {CommonNotesService} from "../../services/common-notes.service";
import {NoteDto} from "../../models/note.dto";
import {CategoryService} from "../../../../core/services/category.service";
import {CurrentUserService} from "../../../../core/services/current-user.service";
import {MatDialog} from "@angular/material/dialog";
import {AddEditNoteComponent} from "../../components/add-edit-note/add-edit-note.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-notes-list-view',
  templateUrl: './notes-list-view.component.html',
  styleUrl: './notes-list-view.component.scss'
})
export class NotesListViewComponent {

  public activeCategorySelected = new FormControl(0);
  public archivedCategorySelected = new FormControl(0);

  constructor(private _noteService: NoteService,
              private _categoryService: CategoryService,
              public _super: CommonNotesService,
              public _currentUserService: CurrentUserService,
              public _dialog: MatDialog,
              public _snackBar: MatSnackBar,
              private _router: Router) {
  }

  ngOnInit() {
    this._noteService.getAllNotes(this._currentUserService.user$.value!.id).subscribe(rs => {
      if (rs) {
        this._super.noteList$.next(rs)
        this._super.updateActiveArchivedList();
      }
    })

    this._categoryService.getAllCategories().subscribe(rs => {
      if (rs) {
        this._super.categories$.next(rs);
      }
    })
  }

  onSelectActiveCategory() {
    this._super.filterActivesByCatId$.next(this.activeCategorySelected.value ?? 0);
  }

  onSelectArchiveCategory() {
    this._super.filterArchivesByCatId$.next(this.archivedCategorySelected.value ?? 0);
  }

  onLogout() {
    localStorage.removeItem("eToken");
    localStorage.removeItem('eUser');
    this._currentUserService.user$.next(null);
    this._router.navigate(['/auth/login'])
  }

  onAddNote() {
    const dialogRef = this._dialog.open(AddEditNoteComponent, {
      width: '575px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.activeCategorySelected.setValue(0);
        this.archivedCategorySelected.setValue(0)
        this.displayNotification('Success: Note Created');
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
