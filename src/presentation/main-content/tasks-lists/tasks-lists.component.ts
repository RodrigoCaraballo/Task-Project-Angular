import { Component, Input } from '@angular/core';
import { ITaskModel, UpdateTaskRequest } from '../../../domain';
import { DeleteOneTaskUseCase, UpdateTaskUseCase } from '../../../application/use-cases';
import { SharedMainContentService } from '../utils';

@Component({
  selector: 'app-tasks-lists',
  templateUrl: './tasks-lists.component.html',
  styleUrls: ['./tasks-lists.component.scss']
})
export class TasksListsComponent {

  @Input() task?: ITaskModel;
  turnCard: boolean = false;

  constructor(
    private readonly updateTaskeUseCase: UpdateTaskUseCase,
    private readonly sharedMainContentService: SharedMainContentService,
    private readonly deleteOneTaskUseCase: DeleteOneTaskUseCase
  ) {}

  turnCardNow(): void {
    this.turnCard =!this.turnCard;
  }

  changeSelectedTask(): void {
    if(this.task) this.sharedMainContentService.changeSelectedTask(this.task);
    this.sharedMainContentService.changeActivateState(true);
  }

  changeTaskState(): void {
    if(this.task) {
      this.task.completed =!this.task.completed;

      const taskToUpdate: UpdateTaskRequest = {
        title: this.task.title,
        description: this.task.description,
        deadline: this.task.deadline,
        completed: this.task.completed
      }

      this.updateTaskeUseCase.execute(this.task.taskId, taskToUpdate)
      .subscribe((value: ITaskModel) => {
        this.sharedMainContentService.addNewTask(value);
      })
    }
  }

  deleteOne(): void {
    if(this.task) this.deleteOneTaskUseCase.execute(this.task.taskId).subscribe((value: boolean) => {
      if(value) {
        if(this.task) this.sharedMainContentService.setDeletedTask(this.task)
      }
    })
  }
}
