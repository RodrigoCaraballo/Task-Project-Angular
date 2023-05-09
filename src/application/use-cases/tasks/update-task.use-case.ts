import { ITaskModel, UpdateTaskRequest } from "../../../domain";
import { TaskService } from "../../../application/services";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    private readonly taskService: TaskService
  ) {}

  execute(taskId: string, data: UpdateTaskRequest): Observable<ITaskModel> {
    return this.taskService.updateTask(taskId, data);
  }
}
