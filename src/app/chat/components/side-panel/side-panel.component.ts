import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NewConversationComponent} from "../new-conversation/new-conversation.component";
import {tap} from "rxjs/operators";
import {ChannelsService} from "../../services/channels.service";
import {ChannelsSubscribeService} from "../../services/channels-subscribe.service";
import {ChatObservableService} from "../../services/chat-observable.service";
import {ChatEventService} from "../../services/chat-event.service";
import {SuggestedUser} from "../../../user/model/user";
import {FormControl, Validators} from "@angular/forms";
import {UsersService} from "../../../user/services/users.service";
import {ChannelType, CreateChannel} from "../../model/chat.dto";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  member!: FormControl;
  filteredOption: SuggestedUser[] = [];
  suggestedUser: SuggestedUser[] = [];

  constructor(
    private dialog: MatDialog,
    private channelsSubscribe: ChannelsSubscribeService,
    public observableChatService: ChatObservableService,
    private channelEventService: ChatEventService,
    private channelsService: ChannelsService,
    private usersService: UsersService,
  ) {
    this.member = new FormControl('', Validators.required);
    this.filterUser();
  }

  private filterUser(): void {
    this.member.valueChanges
      .subscribe(response => {
        if (response.length >= 3) {
          this.usersService.getSuggestedUser(response)
            .subscribe(list => {
                this.suggestedUser = list;
                this.filteredOption = list;
              }
            )
        }
        this.filterData(response);
        if (this.member.value instanceof Object)
        this.createConversation()
      })
  }

  private filterData(enteredData: String) {
    this.filteredOption = this.suggestedUser.filter(item => {
      return item.username.toLowerCase().indexOf(enteredData.toString().toLowerCase()) > -1;
    })
  }

  createConversation() {
    let channelCommand = {channelName: this.member.value.username, members: [this.member.value.id], channelType: ChannelType.PRIVATE_MESSAGES};

    this.channelsService.createNewChannel(channelCommand).subscribe( ch => {
      this.observableChatService.setActivatedChannel(ch.idChannel);
      this.observableChatService.setActiveChannelName(ch.channelName);
      this.channelEventService.loadsMessageActiveChannel();


      this.channelsSubscribe.uploadChannels();
      this.member.reset('');
    }
  )
  }

  ngOnInit(): void {
  }

  createNewConversation() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(NewConversationComponent, dialogConfig)
      .afterClosed()
      .pipe(
        tap(() => {
          this.channelsSubscribe.uploadChannels()
        })
      ).subscribe()
  }

  setActiveChannel(id: number, name: string) {
    this.observableChatService.setActivatedChannel(id);
    this.observableChatService.setActiveChannelName(name);

    this.channelEventService.clearNotificationNumberNewMessage();
    this.channelEventService.loadsMessageActiveChannel();
    this.channelsService.clearNotification(id);

  }

  getUsername(option: SuggestedUser): string {
    return option.username;
  }
}
