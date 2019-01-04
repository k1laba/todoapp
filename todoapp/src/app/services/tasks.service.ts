import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/models/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  public get(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.api_url}/tasks`);
  }
  public remove(id:string): Observable<object> {
    return this.http.delete(`${environment.api_url}/tasks/${id}`);
  }
}
