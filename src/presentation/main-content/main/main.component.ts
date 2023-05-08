import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { SharedMainContentService } from '../shared-data';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  activateNewTasks: boolean = false;

  task = this.fb.group({
    date: this.fb.nonNullable.control('',
      { validators: [Validators.required, Validators.pattern('^(?!.* {2,})(?!^ )(?!\s$)[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$')] }),
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly mainContentHelperService: SharedMainContentService
  ) {}

  ngOnInit(): void {
    this.mainContentHelperService.nowIsActivate.subscribe(value => this.activateNewTasks = value);
  }

  changeActivateNewTasks(data: boolean) {
    this.mainContentHelperService.changeActivateState(data)
  }
}
