import { CreateTaskRequest, ITaskModel } from "../../../domain";
import { TaskService } from "../../../application/services";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class CreateTaskUseCase {
  constructor(
    private readonly taskService: TaskService
  ) {}

  execute(data: CreateTaskRequest): Observable<ITaskModel> {
    return this.taskService.addTask(data);
  }
}
