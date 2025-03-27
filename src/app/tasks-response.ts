import { Task } from "./task";


export interface TasksResponse {
    limit: number,
    skip: number,
    total: number,
    todos: Task[]
}
