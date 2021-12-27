import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {LoggedUserDataService} from "../../../login/services/logged-user-data.service";
import {DailyService} from "../../services/daily.service";
import {CreateTask, Daily, TypeTask} from "../../model/createTask";

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit {
  formGroup!: FormGroup
  title!: FormControl;
  idTeam!: number;
  daily!: Daily;

  constructor(
    private route: ActivatedRoute,
    private loggedUser: LoggedUserDataService,
    private dailyService: DailyService) {
    this.route.params.subscribe(params => {
      this.idTeam = parseInt(params['id'])
    })
    this.initForm()
  }

  initForm(): void {
    this.title = new FormControl('', Validators.required);

    this.formGroup = new FormGroup({
      title: this.title
    })
  }


  ngOnInit(): void {
    this.dailyService.getDaily(this.idTeam).subscribe(daily => this.daily = daily);
  }

  addTask() {
    this.dailyService.savedNewTask(this.getData()).subscribe(
      () => {
        this.formGroup.reset();
      }
    )
  }

  getData(): CreateTask {
    return {
      userId: this.loggedUser.loginUser.id,
      teamId: this.idTeam,
      titleTask: this.title.value,
      typeTask: TypeTask.TASK
    } as CreateTask
  }

}
