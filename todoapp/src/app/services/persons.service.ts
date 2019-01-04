import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from 'src/models/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor(private http: HttpClient) { }

  public getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.api_url}/persons`);
  }
  public removePerson(id:string) {
    return this.http.delete(`${environment.api_url}/persons/${id}`);
  }
}
