export class CreateMessageCommand {
  channelId: number;
  content: string;
  senderId: number;
  senderName: string;

  constructor(channelId: number, content: string, senderId: number, senderName: string) {
    this.channelId = channelId ;
    this.content = content;
    this.senderId = senderId;
    this.senderName = senderName
  }
}
