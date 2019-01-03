import { AppState } from "./app.state";
import { TodoActionsUnion, TodoActionTypes } from "./app.action";
import { createCopy } from 'src/utils';
import { Priority, State } from 'src/models/models';

const initialState: AppState = {
    activePersonIndex: 0,
    persons: [
        {
            id: "1", title: "person 1", tasks: [
                { id: "1", title: "task 1", description: "desc 1", priority: Priority.Critical, state: State.New },
                { id: "2", title: "task 2", description: "desc 2", priority: Priority.Medium, state: State.Active }
            ]
        },
        {
            id: "2", title: "person 2", tasks: [
                { id: "3", title: "task 3", description: "desc 3", priority: Priority.Critical, state: State.New },
                { id: "4", title: "task 4", description: "desc 4", priority: Priority.Medium, state: State.Active },
                { id: "5", title: "task 5", description: "desc 5", priority: Priority.Low, state: State.Resolved }
            ]
        }
    ],
};

export const rootReducer = function (state: AppState = initialState, action: TodoActionsUnion) {
    switch (action.type) {
        case TodoActionTypes.REMOVE_TASK: {
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
            task.id = task.id || (person.tasks.length + 1).toString();
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
        case TodoActionTypes.REMOVE_PERSON: {
            let stateCopy = createCopy(state);
            stateCopy.persons.splice(action.payload, 1);
            stateCopy.persons = stateCopy.persons.sort((a, b) => a.title.localeCompare(b.title));
            return { ...stateCopy };
        }
        case TodoActionTypes.SAVE_PERSON: {
            let stateCopy = createCopy(state);
            let person = stateCopy.persons[action.payload.personIndex];
            person.title = action.payload.title;
            person.id = person.id || (stateCopy.persons.length + 1).toString();
            stateCopy.persons = stateCopy.persons.sort((a, b) => a.title.localeCompare(b.title));
            stateCopy.activePersonIndex = stateCopy.persons.findIndex(p => p.id === person.id);
            return { ...stateCopy };
        }
        default:
            return state;
    }
}