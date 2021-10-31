export class MessageDto {
  channelId: number;
  content: string;
  senderEmail: string

  constructor(channelId: number, content: string, senderEmail: string) {
    this.channelId = channelId;
    this.content = content;
    this.senderEmail = senderEmail
  }
}
