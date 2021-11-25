import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProjectsService} from "../../services/projects.service";
import {ProductBacklogService} from "../../services/product-backlog.service";
import {PriorityStatus, UserStory} from "../../model/task";

@Component({
  selector: 'app-show-task-from-product-backlog',
  templateUrl: './show-task-from-product-backlog.component.html',
  styleUrls: ['./show-task-from-product-backlog.component.scss']
})
export class ShowTaskFromProductBacklogComponent implements OnInit {

  taskId!: number;
  taskFG: FormGroup;
  taskTitleFC: FormControl;
  descriptionFC: FormControl;
  priorityFC: FormControl;
  storyPointFC: FormControl;
  disabled=true;
  statusFC: FormControl;
  keys: any[] = [];
  priority = PriorityStatus;

  constructor(private projectService: ProjectsService,
              private  productBacklogService: ProductBacklogService) {
    this.keys = Object.keys(this.priority).filter(f => !isNaN(Number(f)));
    this.taskTitleFC = new FormControl({ value: '', disabled: this.disabled });
    this.descriptionFC = new FormControl({ value: '', disabled: this.disabled });
    this.priorityFC = new FormControl({ value: '', disabled: this.disabled });
    this.storyPointFC = new FormControl({ value: '', disabled: this.disabled });
    this.statusFC = new FormControl({ value: '', disabled: this.disabled });

    this.taskFG = new FormGroup({
      taskTitleFC: this.taskTitleFC,
      descriptionFC: this.descriptionFC,
      priorityFC: this.priorityFC,
      storyPointFC: this.storyPointFC,
      statusFC: this.statusFC
    })

  }

  ngOnInit() {
    this.productBacklogService.getSelectedTask().subscribe(selectedTask => {if(selectedTask != null) this.setData(selectedTask)})
  }

  setData(userStory: UserStory): void {
    this.taskId = userStory.id;
    this.taskTitleFC.setValue(userStory.title);
    this.descriptionFC.setValue(userStory.description);
    this.priorityFC.setValue(userStory.priority);
    this.statusFC.setValue(userStory.statusIssue);
  }
}
