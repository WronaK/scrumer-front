import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.scss']
})
export class NewConversationComponent implements OnInit {
  newConversationForm!: FormGroup;
  emailRecipient!: FormControl;

  constructor(
    private dialogRef: MatDialogRef<NewConversationComponent>,
    private chatService: ChatService
  ) {
    this.emailRecipient = new FormControl('', Validators.required);
    this.newConversationForm = new FormGroup({
      emailRecipient: this.emailRecipient
    })
  }

  ngOnInit(): void {
  }

  createConversation() {
    this.chatService.createNewConversation(this.emailRecipient.value)
      .subscribe(() => this.dialogRef.close());
  }
}
