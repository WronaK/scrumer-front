import {Component, Input, OnInit} from '@angular/core';
import {UploadsService} from "../../services/uploads.service";

@Component({
  selector: 'app-picture-user',
  templateUrl: './picture-user.component.html',
  styleUrls: ['./picture-user.component.scss']
})
export class PictureUserComponent implements OnInit {
  @Input()
  initial!: String;

  @Input()
  idImage!: number

  imgUrl: any;

  constructor(
    private uploadService: UploadsService
  ) { }

  ngOnInit(): void {
    if (this.idImage != undefined) {
      console.log("Picytu..")
      this.uploadService.getImage(this.idImage).subscribe(
        res => {
          this.createImage(res)
        });
    }
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
