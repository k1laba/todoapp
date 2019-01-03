export interface Person {
    id: string;
    title?: string;
    tasks?: Task[];
}
export interface Task {
    id?:string;
    title?:string;
    description?: string;
    priority?: Priority;
    state?: State;
    personId?: string;
    estimate?: Date;
}

export enum Priority {
    Critical,
    Medium,
    Low
}
export enum State {
    New,
    Active,
    Resolved,
    Closed
}