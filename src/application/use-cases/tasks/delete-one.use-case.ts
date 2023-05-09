import { TaskService } from "../../../application/services";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class DeleteOneTaskUseCase {
  constructor(
    private readonly taskService: TaskService
  ) {}

  execute(taskId: string): Observable<boolean> {
    return this.taskService.deleteTask(taskId);
  }
}
