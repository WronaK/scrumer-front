import {Component, Input, OnInit} from '@angular/core';
import {ResourceInformation} from "../../model/resource";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.scss']
})
export class InformationCardComponent implements OnInit {

  @Input()
  resourceName!: string;

  @Input()
  resource!: ResourceInformation;

  @Input()
  roleName!: string;

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
    this.accessCode = new FormControl({ value: '', disabled: this.disabled});
    this.username = new FormControl({ value: '', disabled: this.disabled});
  }

  ngOnInit(): void {
    this.setData();
  }

  setData(): void {
    this.name.setValue(this.resource.name);
    this.description.setValue(this.resource.description);
    this.accessCode.setValue(this.resource.accessCode);
    this.username.setValue(this.resource.username);
  }

}
