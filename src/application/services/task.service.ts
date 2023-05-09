import { Injectable } from "@angular/core";
import { CreateTaskRequest, ITaskModel, ITaskService, UpdateTaskRequest } from "../../domain";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TaskService implements ITaskService {

  url: string = 'http://localhost:3000'
  controller: string = 'task'

  constructor(
    private readonly http: HttpClient
  ) {}
  addTask(task: CreateTaskRequest): Observable<ITaskModel> {
    return this.http.post<ITaskModel>(`${this.url}/${this.controller}/add-task`, task)
  }
  getTask(taskId: string): Observable<ITaskModel> {
    return this.http.get<ITaskModel>(`${this.url}/${this.controller}/get-task/${taskId}`)
  }
  getAll(userId: string): Observable<ITaskModel[]> {
    return this.http.get<ITaskModel[]>(`${this.url}/${this.controller}/get-all-task/${userId}`)
  }
  updateTask(taskId: string, task: UpdateTaskRequest): Observable<ITaskModel> {
    return this.http.put<ITaskModel>(`${this.url}/${this.controller}/update-task/${taskId}`, task)
  }
  deleteTask(taskId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${this.controller}/delete-task/${taskId}`)
  }
}
