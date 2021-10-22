import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.scss']
})
export class NewConversationComponent implements OnInit {
  newConversationForm!: FormGroup;
  emailRecipient!: FormControl;

  constructor() {
    this.emailRecipient = new FormControl('', Validators.required);
    this.newConversationForm = new FormGroup({
      emailRecipient: this.emailRecipient
    })
  }

  ngOnInit(): void {
  }

  createConversation() {

  }
}
