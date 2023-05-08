import { Component, ViewChild } from '@angular/core';
import { ITaskModel } from '../../../domain';

@Component({
  selector: 'app-tasks-lists',
  templateUrl: './tasks-lists.component.html',
  styleUrls: ['./tasks-lists.component.scss']
})
export class TasksListsComponent {

  tasks: ITaskModel[] = [];
  turnCard: boolean = false;

  turnCardNow(): void {
    this.turnCard =!this.turnCard;
  }
}
