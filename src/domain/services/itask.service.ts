import { Observable } from "rxjs";
import { CreateTaskRequest, UpdateTaskRequest } from "../interfaces";
import { ITaskModel } from "../models";

export interface ITaskService {
  addTask(task: CreateTaskRequest): Observable<ITaskModel>;
  getTask(taskId: string): Observable<ITaskModel>;
  getAll(userId: string): Observable<ITaskModel[]>;
  updateTask(taskId: string, task: UpdateTaskRequest): Observable<ITaskModel>;
  deleteTask(taskId: string): Observable<boolean>;
}
