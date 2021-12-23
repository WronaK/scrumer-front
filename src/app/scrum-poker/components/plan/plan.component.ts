import {Component, Input} from '@angular/core';
import {TaskCommand} from "../../model/scrum.poker.command";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent {

  @Input()
  tasksId!: TaskCommand[];
}
