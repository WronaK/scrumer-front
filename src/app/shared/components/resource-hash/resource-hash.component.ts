import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResourceHash} from "../../model/resource";
import {UploadsService} from "../../services/uploads.service";

@Component({
  selector: 'app-resource-hash',
  templateUrl: './resource-hash.component.html',
  styleUrls: ['./resource-hash.component.scss']
})
export class ResourceHashComponent implements OnInit {

  @Input()
  resource!: ResourceHash;

  @Input()
  title!: string;

  @Output()
  selectedItemEvent = new EventEmitter<number>();

  imgUrl: any;

  constructor(
    private uploadService: UploadsService
  ) { }

  ngOnInit(): void {
    if (this.resource && this.resource.coverId != undefined) {
      this.uploadService.getImage(this.resource.coverId).subscribe(
        res => {
          this.createImage(res)
        });
    }
  }

  selectedNewItem(id: number) {
    this.selectedItemEvent.emit(id);
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
