import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListsComponent } from './tasks-lists.component';

describe('TasksListsComponent', () => {
  let component: TasksListsComponent;
  let fixture: ComponentFixture<TasksListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
