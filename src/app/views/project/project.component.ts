import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectsService} from "../../services/projects.service";
import {ProductBacklogService} from "../../services/product-backlog.service";
import {ProjectDetailsService} from "../../services/project-details.service";
import {ProjectDetails, ProjectInformation} from "../../model/project";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  project!: ProjectInformation;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private productBacklogService: ProductBacklogService,
    private projectDetailsService: ProjectDetailsService
  ) {
    route.params.subscribe(params => {
      this.productBacklogService.setId(parseInt(params['id']));
      this.projectDetailsService.setId(parseInt(params['id']))
    });
  }

  onSelect() {
    return this.productBacklogService.idSelectTask!=null?true:false;
  }

  ngOnInit(): void {
    this.projectService.getInformationAboutProject(this.projectDetailsService.idProject)
      .subscribe(project => this.project = project);
  }
}
