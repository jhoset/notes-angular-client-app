import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = `${environment?.BASE_API_URL}/categories`;

  constructor(private http: HttpClient) {
  }

  createCategory(category: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, category);
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
