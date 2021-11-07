import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  task = ["My task 1", "My task 2", "My task 3", "My task 4", "My task 5", "My task 6", "My task 7", "My task 1", "My task 2", "My task 3", "My task 4", "My task 5", "My task 6", "My task 7"];
  constructor() { }

  ngOnInit(): void {
  }

}
