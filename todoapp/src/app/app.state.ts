import { Person } from 'src/models/models';

export interface AppState {
    persons: Person[];
    activePersonIndex: number;
}


