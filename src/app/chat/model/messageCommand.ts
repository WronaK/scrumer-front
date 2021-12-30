export class MessageCommand {
  content: string
  senderId: number
  senderName: string

  constructor(content: string, senderId: number, senderName: string) {
    this.content = content;
    this.senderId = senderId;
    this.senderName = senderName;
  }

}
