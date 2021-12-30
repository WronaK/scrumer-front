import {Component, Input, OnInit} from '@angular/core';
import {ElementDaily} from "../../model/createTask";

@Component({
  selector: 'app-daily-element',
  templateUrl: './daily-element.component.html',
  styleUrls: ['./daily-element.component.scss']
})
export class DailyElementComponent implements OnInit {

  @Input()
  data!: ElementDaily

  constructor() { }

  ngOnInit(): void {
  }

}
