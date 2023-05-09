import { Observable } from "rxjs";
import { TaskService } from "../../../application/services";
import { ITaskModel } from "../../../domain";
import { Injectable } from "@angular/core";

@Injectable()
export class GetTasksUseCase {
    constructor(
      private readonly taskService: TaskService
    ) {}

    execute(userId: string): Observable<ITaskModel[]> {
      return this.taskService.getAll(userId);
    }
}
