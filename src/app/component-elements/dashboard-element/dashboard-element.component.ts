import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResourceHash} from "../../model/resource";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-element',
  templateUrl: './dashboard-element.component.html',
  styleUrls: ['./dashboard-element.component.scss']
})
export class DashboardElementComponent implements OnInit {

  @Input()
  resource!: ResourceHash[];

  @Input()
  baseName!: string;

  @Output()
  createdNewElementEvent = new EventEmitter<string>();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createdNewElement() {
    this.createdNewElementEvent.emit("creat");
  }

  goToPage(id: number): void {
    this.router.navigate([this.baseName + '/' + id]);
  }
}
