import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { PersonsService } from '../services/persons.service';
import { switchMap, catchError } from 'rxjs/operators';
import { TodoActionTypes, LoadDataSuccessAction } from '../app.action';


@Injectable()
export class PersonsEffects {
  constructor(
    private personsService: PersonsService,
    private actions$: Actions
  ) { }

  @Effect() load$ = this.actions$.pipe(ofType(TodoActionTypes.LOAD_DATA),
      switchMap(() => this.personsService.getPersons()),
      switchMap(res => of(new LoadDataSuccessAction(res)))
  );
}