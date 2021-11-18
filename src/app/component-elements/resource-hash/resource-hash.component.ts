import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResourceHash} from "../../model/resource";

@Component({
  selector: 'app-resource-hash',
  templateUrl: './resource-hash.component.html',
  styleUrls: ['./resource-hash.component.scss']
})
export class ResourceHashComponent implements OnInit {

  @Input()
  resource!: ResourceHash;

  @Output()
  selectedItemEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  selectedNewItem(id: number) {
    this.selectedItemEvent.emit(id);
  }

}
