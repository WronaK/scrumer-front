import {Component, Input, OnInit} from '@angular/core';
import {Channel} from "../../model/chat.dto";
import {UsersService} from "../../../user/services/users.service";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  @Input()
  channel!: Channel;

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
  }

}
