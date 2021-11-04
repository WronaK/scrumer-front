import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ChatService} from "../services/chat.service";
import {CreateChannel} from "../model/createChannel";

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.scss']
})
export class NewConversationComponent implements OnInit {
  newConversationForm!: FormGroup;
  emailRecipient!: FormControl;
  members: string[] = [];
  groupChannel: string = "PRIVATE MESSAGES";

  groupsChannel: string[] = ['PRIVATE MESSAGES', 'GROUP CHANNEL'];
  channelName!: FormControl;

  constructor(
    private dialogRef: MatDialogRef<NewConversationComponent>,
    private chatService: ChatService
  ) {
    this.emailRecipient = new FormControl('', Validators.required);
    this.channelName = new FormControl('');
    this.newConversationForm = new FormGroup({
      emailRecipient: this.emailRecipient,
      channelName: this.channelName
    })
  }

  ngOnInit(): void {
  }

  createConversation() {
    let channelType: string;

    if (this.groupChannel === "GROUP CHANNEL") {
      channelType = "GROUP_CHANNEL"
    } else {
      channelType = "PRIVATE_MESSAGES"
    }
    let channelCommand = new CreateChannel(this.channelName.value, this.members, channelType);
    console.log(channelCommand);

    if (this.emailRecipient != null) {
      this.members.push(this.emailRecipient.value)
    }
    this.chatService.createNewChannel(channelCommand).subscribe(
      () => this.dialogRef.close()
    )

    this.members = [];
    this.newConversationForm.reset();
  }

  addNewItem() {
    this.members.push(this.emailRecipient.value);
    this.emailRecipient.reset();
  }

  deleteMembers(member: string) {
    this.members.forEach((element,index) => {
      if (element==member) {
        this.members.splice(index, 1);
      }
    })
  }
}
