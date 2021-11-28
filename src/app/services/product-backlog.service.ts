import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ProjectsService} from "./projects.service";
import {tap} from "rxjs/operators";
import {UserStory} from "../model/task";
import {UserStoryService} from "./user-story.service";

@Injectable({
  providedIn: 'root'
})
export class ProductBacklogService {

  private productBacklog$: BehaviorSubject<UserStory[]> = new BehaviorSubject<UserStory[]>([]);
  private selectedTask$: BehaviorSubject<UserStory | null> = new BehaviorSubject<UserStory | null>(null);
  idProject!: number;
  idSelectTask!: number | null;

  constructor(
    private projectsService: ProjectsService,
    private userStoryService: UserStoryService) {
  }

  setId(id: number) {
    this.idProject = id;
  }

  getProductBacklog(): Observable<UserStory[]> {
    return this.productBacklog$.asObservable();
  }

  setProductBacklog(productBacklog: UserStory[]) {
    this.productBacklog$.next(productBacklog);
  }

  getSelectedTask(): Observable<UserStory | null> {
    return this.selectedTask$.asObservable();
  }

  setSelectedTask(task: UserStory) {
    this.selectedTask$.next(task);
  }


  setSelectTask(id: number | null) {
    this.idSelectTask = id;
    this.selectedTask();
  }

  productBacklog() {
    this.projectsService.getProductBacklog(this.idProject)
      .pipe(tap(productBacklog => this.setProductBacklog(productBacklog))).subscribe();
  }

  selectedTask() {
    if(this.idSelectTask != null) {
      this.userStoryService.getUserStory(this.idSelectTask)
        .pipe(tap(task => this.setSelectedTask(task))).subscribe();
    }
  }

}
