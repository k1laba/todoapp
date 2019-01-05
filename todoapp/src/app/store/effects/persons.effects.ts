import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { PersonsService } from '../../services/persons.service';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { TodoActionTypes, LoadDataSuccessAction, RemovePersonAction, RemovePersonSuccessAction, SavePersonAction, SavePersonSuccessAction } from '../app.action';
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
  @Effect() save$ = this.actions$.pipe(ofType(TodoActionTypes.SAVE_PERSON),
      map((action:SavePersonAction) => action.payload),
      withLatestFrom(this.store.pipe(select(s => s.persons))),
      switchMap(([payload, persons]) => {
        const person = persons[payload.index];
        return  this.personsService.save(person).pipe(map((res) => new SavePersonSuccessAction(res)));
      })
  );
  @Effect() remove$ = this.actions$.pipe(ofType(TodoActionTypes.REMOVE_PERSON),
      map((action:RemovePersonAction) => action.payload),
      withLatestFrom(this.store.pipe(select(s => s.persons))),
      switchMap(([index, persons]) => {
        const personId = persons[index].id;
        if (!personId) { return of(new RemovePersonSuccessAction(index)); }
        return  this.personsService.remove(personId).pipe(map(() => new RemovePersonSuccessAction(index)));
      })
  );
}