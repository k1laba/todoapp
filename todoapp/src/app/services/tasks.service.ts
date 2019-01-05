import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private TASKS_API_URL:string = `${environment.api_url}/tasks`;

  constructor(private http: HttpClient) { }

  public save(task:Task): Observable<Task> {
    return this.http.post(this.TASKS_API_URL, task);
  }
  public remove(id:string): Observable<object> {
    return this.http.delete(`${this.TASKS_API_URL}/${id}`);
  }
}
