import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.scss']
})
export class MyCardComponent implements OnInit {

  @Input()
  value: any;

  @Input()
  my!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
