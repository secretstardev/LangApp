import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  @Input()
  totalSteps: number;

  @Input()
  currentStep: number;

  stepsArray = [];

  constructor() {
  }

  ngOnInit(): void {
    this.stepsArray = new Array(this.totalSteps);
  }

}
