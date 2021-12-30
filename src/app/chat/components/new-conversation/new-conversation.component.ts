import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ChannelsService} from "../../services/channels.service";
import {ChannelType, CreateChannel} from "../../model/chat.dto";
import {SuggestedUser, User} from "../../../user/model/user";
import {UsersService} from "../../../user/services/users.service";
import {ChatObservableService} from "../../services/chat-observable.service";
import {ChatEventService} from "../../services/chat-event.service";

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.scss']
})
export class NewConversationComponent implements OnInit {
  newConversationForm!: FormGroup;
  membersFormControl = new FormArray([]);

  channelName!: FormControl;

  filteredOption: SuggestedUser[] = [];
  suggestedUser: SuggestedUser[] = [];

  constructor(
    private dialogRef: MatDialogRef<NewConversationComponent>,
    private channelService: ChannelsService,
    private usersService: UsersService,
    public observableChatService: ChatObservableService,
    private channelEventService: ChatEventService,

  ) {
    // this.emailRecipient = new FormControl('', Validators.required);
    this.channelName = new FormControl('');
    // this.membersFormControl = new FormArray([]);

    this.initItems()

    this.newConversationForm = new FormGroup({
      members: this.membersFormControl,
      channelName: this.channelName
    })

    this.filterUser()
  }

  ngOnInit(): void {
  }

  initItems() {
    this.membersFormControl.push(
      new FormControl('')
    )
  }

  private filterUser(): void {
    console.log("hrl: ", this.membersFormControl)
    this.membersFormControl.controls.forEach(control => {
        control.valueChanges
          .subscribe(response => {
            console.log("rrr: ", response)
            if (response.length >= 3) {
              this.usersService.getSuggestedUser(response)
                .subscribe(list => {
                    this.suggestedUser = list;
                    this.filteredOption = list;
                  }
                )
            }
            this.filterData(response);
          })
      }
    )
  }

  private filterData(enteredData: String) {
    this.filteredOption = this.suggestedUser.filter(item => {
      return item.username.toLowerCase().indexOf(enteredData.toString().toLowerCase()) > -1;
    })
  }

  createConversation() {
    let members: number[] = [];

    this.membersFormControl.controls.forEach(formControl => {
      if (formControl.value.id !=undefined) {
        members.push(formControl.value.id)
      }
    })
    let channelCommand = {channelName: this.channelName.value, members: members, channelType: ChannelType.GROUP_CHANNEL};
    console.log(channelCommand);

    this.channelService.createNewChannel(channelCommand).subscribe(
      ch => {
        this.observableChatService.setActivatedChannel(ch.idChannel);
        this.observableChatService.setActiveChannelName(ch.channelName);
        this.channelEventService.loadsMessageActiveChannel();
        this.dialogRef.close();
        // ustawić ten chat jako pierwszy

      }
    )
  }

  addNewItem() {
    this.membersFormControl.push(
      new FormControl('')
    )

    this.filterUser()

  }

  getUsername(option: SuggestedUser): string {
    return option.username;
  }

  removeMember(i: number) {
    this.membersFormControl.removeAt(i);
  }
}
