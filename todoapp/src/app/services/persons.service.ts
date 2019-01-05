import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from 'src/models/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  private PERSONS_API_URL = `${environment.api_url}/persons`; 

  constructor(private http: HttpClient) { }

  public get(): Observable<Person[]> {
    return this.http.get<Person[]>(this.PERSONS_API_URL);
  }
  save(person:Person): Observable<Person> {
    return this.http.post(this.PERSONS_API_URL, { id: person.id, title: person.title });
  }
  public remove(id: string): Observable<object> {
    return this.http.delete(`${this.PERSONS_API_URL}/${id}`);
  }
}
