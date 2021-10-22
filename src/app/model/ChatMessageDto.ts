export class ChatMessageDto {
  senderEmail: string;
  message: string;

  constructor(senderEmail: string, message: string) {
    this.senderEmail = senderEmail;
    this.message = message;
  }
}
