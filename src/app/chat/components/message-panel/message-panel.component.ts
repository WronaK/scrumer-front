import {Component} from '@angular/core';
import {ChannelsService} from "../../services/channels.service";
import {CreateMessageCommand} from "../../model/createMessageCommand";
import {ChatObservableService} from "../../services/chat-observable.service";
import {LoginUser} from "../../../login/model/login.user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoggedUserDataService} from "../../../login/services/logged-user-data.service";
import {ChatEventService} from "../../services/chat-event.service";

@Component({
  selector: 'app-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.scss']
})
export class MessagePanelComponent {

  idActiveChannel!: number;
  user!: LoginUser;
  messageForm: FormGroup;
  messageInput: FormControl;
  activeChannelName!: string;

  constructor(
    private channelService: ChannelsService,
    public observableChatService: ChatObservableService,
    private loggedService: LoggedUserDataService,
    private chatEventService: ChatEventService
  ) {
    this.observableChatService.activatedChannel.subscribe(
      activeId => this.idActiveChannel = activeId
    )

    this.observableChatService.activeChannelName.subscribe(
      name => this.activeChannelName = name
    )

    this.user = loggedService.loginUser;
    this.messageInput = new FormControl('', Validators.required);
    this.messageForm = new FormGroup({
      messageInput: this.messageInput
    })
  }

  sendMessage() {
    if (this.idActiveChannel != null) {
      const messageDto = new CreateMessageCommand(this.idActiveChannel, this.messageInput.value, this.user.id, this.user.name + " " + this.user.surname);
      this.chatEventService.setLastMessage(messageDto.content);
      this.channelService.sendMessage(messageDto)
      this.messageForm.reset();
    }
  }
}
