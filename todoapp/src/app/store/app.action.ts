import { Action } from "@ngrx/store";
import { Task, Person } from 'src/models/models';
import { Guid } from 'guid-typescript';

export const enum TodoActionTypes {
    REMOVE_TASK = "REMOVE_TASK",
    REMOVE_TASK_SUCCESS = "REMOVE_TASK_SUCCESS",
    SAVE_TASK = "SAVE_TASK",
    SAVE_TASK_SUCCESS = "SAVE_TASK_SUCCESS",
    SET_ACTIVE_PERSON_INDEX = "SET_ACTIVE_PERSON_INDEX",
    ADD_PERSON = "ADD_PERSON",
    REMOVE_PERSON = "REMOVE_PERSON",
    REMOVE_PERSON_SUCCESS = "REMOVE_PERSON_SUCCESS",
    SAVE_PERSON = "SAVE_PERSON",
    SAVE_PERSON_SUCCESS = "SAVE_PERSON_SUCCESS",
    LOAD_DATA = "LOAD_DATA",
    LOAD_DATA_SUCCESS = "LOAD_DATA_SUCCESS"
}

export type TodoActionsUnion = LoadDataSuccessAction | RemoveTaskSuccessAction | SaveTaskSuccessAction 
                              | SetActivePersonIndexAction | AddPersonAction
                              | RemovePersonSuccessAction | SavePersonAction | SavePersonSuccessAction;

export class RemoveTaskAction implements Action {
    readonly type = TodoActionTypes.REMOVE_TASK;
    constructor(public payload: RemoveTaskActionPayload) { }
}
export class RemoveTaskSuccessAction implements Action {
    readonly type = TodoActionTypes.REMOVE_TASK_SUCCESS;
    constructor(public payload: RemoveTaskActionPayload) { }
}
export class SaveTaskAction implements Action {
    readonly type = TodoActionTypes.SAVE_TASK;;
    constructor(public payload: SaveTaskActionPayload) { }
}
export class SaveTaskSuccessAction implements Action {
    readonly type = TodoActionTypes.SAVE_TASK_SUCCESS;
    constructor(public payload: Task) { }
}
export class SetActivePersonIndexAction implements Action {
    readonly type = TodoActionTypes.SET_ACTIVE_PERSON_INDEX;
    constructor(public payload: string) { }
}
export class AddPersonAction implements Action {
    readonly type = TodoActionTypes.ADD_PERSON;
    constructor(public payload: string) { }
}
export class RemovePersonAction implements Action {
    readonly type = TodoActionTypes.REMOVE_PERSON;
    constructor(public payload: number) { }
}
export class RemovePersonSuccessAction implements Action {
    readonly type = TodoActionTypes.REMOVE_PERSON_SUCCESS;
    constructor(public payload: number) { }
}
export class SavePersonAction implements Action {
    readonly type = TodoActionTypes.SAVE_PERSON;
    constructor(public payload: SavePersonActionPayload) { }
}
export class SavePersonSuccessAction implements Action {
    readonly type = TodoActionTypes.SAVE_PERSON_SUCCESS;
    constructor(public payload: Person) { }
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
    title: string;
    index: number;
}