import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from "../../../user/services/users.service";

@Component({
  selector: 'app-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.scss']
})
export class VoteCardComponent implements OnInit {

  @Input()
  value!: string;

  @Input()
  isMember!: boolean;

  @Input()
  isActive: boolean = false;

  @Input()
  selectedValue!: string;

  @Input()
  idMember!: number;

  initial!: string;
  idImage!: number;

  constructor(
    private userService: UsersService
  ) {
  }

  ngOnInit(): void {
    if (!this.isMember && this.idMember != undefined) {
      this.userService.getInitialAndIdImage(this.idMember).subscribe(
        result => {
          this.initial = result.initial;
          this.idImage = result.idImage;
        }
      )
    }
  }


}
