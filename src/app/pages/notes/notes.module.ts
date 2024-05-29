import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotesComponent} from './notes.component';
import {NotesListViewComponent} from './views/notes-list-view/notes-list-view.component';
import {NotesRoutingModule} from "./notes-routing.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {ListComponent} from './components/list/list.component';
import {CardItemComponent} from './components/card-item/card-item.component';
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AddEditNoteComponent} from './components/add-edit-note/add-edit-note.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ConfirmationComponent} from './components/confirmation/confirmation.component';
import {MatChipsModule} from "@angular/material/chips";
import {AddCategoryComponent} from './components/add-category/add-category.component';
import {CommonNotesService} from "./services/common-notes.service";
import {SharedModule} from "../../shared/shared.module";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    NotesComponent,
    NotesListViewComponent,
    ListComponent,
    CardItemComponent,
    AddEditNoteComponent,
    ConfirmationComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatChipsModule,
    SharedModule,
    MatSelectModule
  ],
  providers: [CommonNotesService]
})
export class NotesModule {
}
