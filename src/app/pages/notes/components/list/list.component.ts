import {Component, Input} from '@angular/core';
import {NoteService} from "../../../../core/services/note.service";
import {CommonNotesService} from "../../services/common-notes.service";
import {NoteDto} from "../../models/note.dto";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input({required: true}) notes: NoteDto[] = [];
}
