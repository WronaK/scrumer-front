import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResourceDescription} from "../../model/resource";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-resource-description',
  templateUrl: './resource-description.component.html',
  styleUrls: ['./resource-description.component.scss']
})
export class ResourceDescriptionComponent implements OnInit {

  @Input()
  resourceName!: string;

  @Input()
  resource!: ResourceDescription;

  @Input()
  roleName!: string;

  @Output()
  selectedElementEvent = new EventEmitter<number>();

  name!: FormControl;
  description!: FormControl;
  accessCode!: FormControl;
  username!: FormControl;

  disabled = true;

  constructor() {
    this.initForm();
  }

  private initForm(): void {
    this.name = new FormControl({ value: '', disabled: this.disabled});
    this.description = new FormControl({ value: '', disabled: this.disabled});
    this.username = new FormControl({ value: '', disabled: this.disabled});
  }

  ngOnInit(): void {
    this.setData();
  }

  setData(): void {
    this.name.setValue(this.resource.name);
    this.description.setValue(this.resource.description);
    this.username.setValue(this.resource.username);
  }

  goTo(id: number) {
    this.selectedElementEvent.emit(id);
  }
}
