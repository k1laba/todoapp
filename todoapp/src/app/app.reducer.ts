import { AppState } from "./app.state";
import { TodoActionsUnion, TodoActionTypes } from "./app.action";
import { createCopy } from 'src/utils';
import { Priority, State } from 'src/models/models';
import { Guid } from "guid-typescript";

const initialState: AppState = {
    activePersonIndex: 0,
    persons: [],
};

export const rootReducer = function (state: AppState = initialState, action: TodoActionsUnion) {
    switch (action.type) {
        case TodoActionTypes.LOAD_DATA_SUCCESS: {
            const data = action.payload;
            return { ...state, persons: [...data] };
        }
        case TodoActionTypes.REMOVE_TASK_SUCCESS: {
            let stateCopy = createCopy(state);
            stateCopy.activePersonIndex = action.payload.personIndex;
            const person = stateCopy.persons[action.payload.personIndex];
            person.tasks.splice(action.payload.taskIndex, 1).sort((a, b) => a.priority - b.priority);
            return { ...stateCopy };
        }
        case TodoActionTypes.SAVE_TASK: {
            let stateCopy = createCopy(state);
            const person = stateCopy.persons[state.activePersonIndex];
            let task = action.payload.task;
            task.personId = person.id;
            task.id = task.id || Guid.create().toString();
            const index = person.tasks.findIndex(t => t.id === task.id);
            if (index > -1) { person.tasks[index] = task; }
            person.tasks = (index === -1 ? [...person.tasks, task] : [...person.tasks]).sort((a, b) => a.priority - b.priority);
            return { ...stateCopy };
        }
        case TodoActionTypes.SET_ACTIVE_PERSON_INDEX: {
            let stateCopy = createCopy(state);
            stateCopy.activePersonIndex = action.payload;
            return { ...stateCopy };
        }
        case TodoActionTypes.ADD_PERSON: {
            let stateCopy = createCopy(state);
            stateCopy.persons = [...stateCopy.persons, { title: action.payload } ];
            stateCopy.activePersonIndex = 0;
            stateCopy.persons = stateCopy.persons.sort((a, b) => a.title.localeCompare(b.title));
            return { ...stateCopy };
        }
        case TodoActionTypes.REMOVE_PERSON_SUCCESS: {
            let stateCopy = createCopy(state);
            stateCopy.persons.splice(action.payload, 1);
            stateCopy.persons = stateCopy.persons.sort((a, b) => a.title.localeCompare(b.title));
            return { ...stateCopy };
        }
        case TodoActionTypes.SAVE_PERSON: {
            let stateCopy = createCopy(state);
            let person = stateCopy.persons[action.payload.personIndex];
            person.title = action.payload.title;
            person.id = person.id || Guid.create().toString();
            stateCopy.persons = stateCopy.persons.sort((a, b) => a.title.localeCompare(b.title));
            stateCopy.activePersonIndex = stateCopy.persons.findIndex(p => p.id === person.id);
            return { ...stateCopy };
        }
        default:
            return state;
    }
}