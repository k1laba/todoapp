import { Action } from "@ngrx/store";
import { Task, Person } from 'src/models/models';

export const enum TodoActionTypes {
    REMOVE_TASK = "REMOVE_TASK",
    SAVE_TASK = "SAVE_TASK",
    SET_ACTIVE_PERSON_INDEX = "SET_ACTIVE_PERSON_INDEX",
    ADD_PERSON = "ADD_PERSON",
    REMOVE_PERSON = "REMOVE_PERSON",
    SAVE_PERSON = "SAVE_PERSON",
    LOAD_DATA = "LOAD_DATA",
    LOAD_DATA_SUCCESS = "LOAD_DATA_SUCCESS"
}

export type TodoActionsUnion = LoadDataSuccessAction | RemoveTaskAction | SaveTaskAction | SetActivePersonIndexAction | AddPersonAction
                               | RemovePersonAction | SavePersonAction;

export class RemoveTaskAction implements Action {
    readonly type = TodoActionTypes.REMOVE_TASK;
    constructor(public payload: RemoveTaskActionPayload) { }
}
export class SaveTaskAction implements Action {
    readonly type = TodoActionTypes.SAVE_TASK;;
    constructor(public payload: SaveTaskActionPayload) { }
}
export class SetActivePersonIndexAction implements Action {
    readonly type = TodoActionTypes.SET_ACTIVE_PERSON_INDEX;
    constructor(public payload: number) { }
}
export class AddPersonAction implements Action {
    readonly type = TodoActionTypes.ADD_PERSON;
    constructor(public payload: string) { }
}
export class RemovePersonAction implements Action {
    readonly type = TodoActionTypes.REMOVE_PERSON;
    constructor(public payload: number) { }
}
export class SavePersonAction implements Action {
    readonly type = TodoActionTypes.SAVE_PERSON;
    constructor(public payload: SavePersonActionPayload) { }
}
export class LoadDataAction implements Action {
    readonly type = TodoActionTypes.LOAD_DATA;
    constructor() { }
}
export class LoadDataSuccessAction implements Action {
    readonly type = TodoActionTypes.LOAD_DATA_SUCCESS;
    constructor(public payload: Person[]) { }
}

export interface SaveTaskActionPayload {
    task: Task;
}
export interface RemoveTaskActionPayload {
    taskIndex: number;
    personIndex: number;
}
export interface SavePersonActionPayload {
    personIndex: number;
    title: string;
}