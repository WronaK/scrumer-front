import {Component, Input, OnInit} from '@angular/core';
import {ResourceInformation} from "../../model/resource";
import {FormControl} from "@angular/forms";
import {UploadsService} from "../../services/uploads.service";
import {HttpResponse} from "@angular/common/http";
import {ProjectsService} from "../../services/projects.service";
import {TeamsService} from "../../services/teams.service";

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

  imgUrl: any;

  name!: FormControl;
  description!: FormControl;
  accessCode!: FormControl;
  username!: FormControl;

  disabled = true;

  image!: File;

  constructor(
    private projectsService: ProjectsService,
    private teamsService: TeamsService,
    private uploadService: UploadsService
  ) {
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

    console.log("cover id: " + this.resource.coverId)
    if (this.resource.coverId != undefined) {
      this.uploadService.getImage(this.resource.coverId).subscribe(
        res => {
          this.createImage(res)
        });
    }
  }

  setData(): void {
    this.name.setValue(this.resource.name);
    this.description.setValue(this.resource.description);
    this.accessCode.setValue(this.resource.accessCode);
    this.username.setValue(this.resource.username);
  }

  selectFiles(event: any): void {
    this.image = event.target.files[0];

    if (this.image) {
      if (this.resourceName === 'project') {
        this.uploadCoverToProject();
      } else if (this.resourceName == 'team') {
        this.uploadCoverToTeam();
      }
    }
  }

  uploadCoverToProject() {
    this.projectsService.uploadCover(this.resource.id, this.image).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.createImage(this.image)
        }
      }
    )
  }

  uploadCoverToTeam() {
    this.teamsService.uploadCover(this.resource.id, this.image).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.createImage(this.image)
        }
      }
    )
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
