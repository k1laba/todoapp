import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { TasksService } from '../services/Tasks.service';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { TodoActionTypes, LoadDataSuccessAction, RemoveTaskAction, RemoveTaskSuccessAction } from '../app.action';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';


@Injectable()
export class TasksEffects {
    constructor(
        private TasksService: TasksService,
        private actions$: Actions,
        private store: Store<AppState>
    ) { }

    @Effect() remove$ = this.actions$.pipe(ofType(TodoActionTypes.REMOVE_TASK),
        map((action: RemoveTaskAction) => action.payload),
        withLatestFrom(this.store.pipe(select(s => s.persons))),
        switchMap(([payload, persons]) => {
            const task = persons[payload.personIndex].tasks[payload.taskIndex];
            return this.TasksService.remove(task.id).pipe(map(() => new RemoveTaskSuccessAction(payload)));
        })
    );
}