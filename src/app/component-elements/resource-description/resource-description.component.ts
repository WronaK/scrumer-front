import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResourceDescription} from "../../model/resource";
import {FormControl} from "@angular/forms";
import {UploadsService} from "../../services/uploads.service";

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

  imgUrl: any;

  constructor(
    private uploadService: UploadsService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.name = new FormControl({ value: '', disabled: this.disabled});
    this.description = new FormControl({ value: '', disabled: this.disabled});
    this.username = new FormControl({ value: '', disabled: this.disabled});
  }

  ngOnInit(): void {

    this.setData();

    if (this.resource.coverId != undefined) {
      this.uploadService.getImage(this.resource.coverId).subscribe(
        res => {
          this.createImage(res)
        });
    }
  }

  public setData(): void {
    this.name.setValue(this.resource.name);
    this.description.setValue(this.resource.description);
    this.username.setValue(this.resource.username);
  }

  public refrash(data: ResourceDescription): void {
    this.name.setValue(data.name);
    this.description.setValue(data.description);
    this.username.setValue(data.username);

    if (data.coverId != undefined) {
      this.uploadService.getImage(data.coverId).subscribe(
        res => {
          this.createImage(res)
        });
    }
  }

  goTo(id: number) {
    this.selectedElementEvent.emit(id);
  }

  createImage(image: Blob) {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        this.imgUrl = reader.result;
      }, false);

      reader.readAsDataURL(image);
    }
  }
}
