import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl = `${environment.BASE_API_URL}/notes`;

  constructor(private http: HttpClient) {
  }

  createNote(note: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, note);
  }

  getAllNotes(userId: number): Observable<any[]> {
    let params = new HttpParams();
    params = params.set('userId', userId.toString());

    return this.http.get<any[]>(this.baseUrl, {params});
  }

  updateNote(id: number, note: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${id}`, note);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  updateNoteStatus(id: number, isActive: boolean): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/status/${id}`, {isActive});
  }
}
