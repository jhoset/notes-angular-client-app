import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CategoryDto} from "../models/category.dto";
import {NoteDto} from "../models/note.dto";

@Injectable()
export class CommonNotesService {

  public categories$: BehaviorSubject<CategoryDto[]> = new BehaviorSubject<CategoryDto[]>([])
  public noteList$: BehaviorSubject<NoteDto[]> = new BehaviorSubject<NoteDto[]>([])
  public activeNotes$: BehaviorSubject<NoteDto[]> = new BehaviorSubject<NoteDto[]>([])
  public archivedNotes$: BehaviorSubject<NoteDto[]> = new BehaviorSubject<NoteDto[]>([])
  public filterActivesByCatId$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(0);
  public filterArchivesByCatId$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(0);

  constructor() {
    this.filterActivesByCatId$.subscribe(id => {
      if (!id) {
        this.setActiveNotes();
      } else {
        this.setActiveNotesFiltered(id)
      }
    })
    this.filterArchivesByCatId$.subscribe(id => {
      if (!id) {
        this.setArchivedNotes();
      } else {
        this.setArchivedNotesFiltered(id)
      }
    })

  }


  public updateActiveArchivedList() {
    this.setActiveNotes()
    this.setArchivedNotes()
  }

  public setActiveNotesFiltered(catId: number) {
    this.activeNotes$.next(this.noteList$.value.filter(note => {
      return !!(note.isActive && note.categories && note.categories.findIndex(cat => cat.id === catId) > -1);
    }));
  }

  public setArchivedNotesFiltered(catId: number) {
    this.archivedNotes$.next(this.noteList$.value.filter(note => {
      return !!(!note.isActive && note.categories && note.categories.findIndex(cat => cat.id === catId) > -1);
    }));
  }

  public setActiveNotes() {
    this.activeNotes$.next(this.noteList$.value.filter(note => note.isActive));
  }

  public setArchivedNotes() {
    this.archivedNotes$.next(this.noteList$.value.filter(note => !note.isActive));
  }
}
