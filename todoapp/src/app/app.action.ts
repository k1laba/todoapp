import { Action } from "@ngrx/store";
import { Task } from 'src/models/models';

export const enum TodoActionTypes {
    REMOVE_TASK = "REMOVE_TASK",
    SAVE_TASK = "SAVE_TASK",
    SET_ACTIVE_PERSON_INDEX = "SET_ACTIVE_PERSON_INDEX"
    
}

export type TodoActionsUnion = RemoveTaskAction | SaveTaskAction | SetActivePersonIndexAction;

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

export interface SaveTaskActionPayload {
    task: Task;
}
export interface RemoveTaskActionPayload {
    taskIndex: number;
    personIndex: number;
}