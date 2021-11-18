import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResourceDescription} from "../../model/resource";

@Component({
  selector: 'app-resource-description',
  templateUrl: './resource-description.component.html',
  styleUrls: ['./resource-description.component.scss']
})
export class ResourceDescriptionComponent implements OnInit {

  @Input()
  resource!: ResourceDescription;

  @Input()
  roleName!: string;

  @Output()
  selectedElementEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  goTo(id: number) {
    this.selectedElementEvent.emit(id);
  }
}
