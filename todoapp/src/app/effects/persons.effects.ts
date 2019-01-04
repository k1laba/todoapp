import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { PersonsService } from '../services/persons.service';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { TodoActionTypes, LoadDataSuccessAction, RemovePersonAction, RemovePersonSuccessAction } from '../app.action';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';


@Injectable()
export class PersonsEffects {
  constructor(
    private personsService: PersonsService,
    private actions$: Actions,
    private store: Store<AppState>
  ) { }

  @Effect() load$ = this.actions$.pipe(ofType(TodoActionTypes.LOAD_DATA),
      switchMap(() => this.personsService.get()),
      switchMap(res => of(new LoadDataSuccessAction(res)))
  );
  @Effect() remove$ = this.actions$.pipe(ofType(TodoActionTypes.REMOVE_PERSON),
      map((action:RemovePersonAction) => action.payload),
      withLatestFrom(this.store.pipe(select(s => s.persons))),
      switchMap(([index, persons]) => {
        return  this.personsService.remove(persons[index].id).pipe(map(() => new RemovePersonSuccessAction(index)));
      })
  );
}