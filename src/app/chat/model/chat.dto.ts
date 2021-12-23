export interface ChatNotification {
  channelId: number,
  messageId: string
}

export class CreateChannel {
  channelName: string
  members: string[]
  channelType: string

  constructor(channelName: string, members: string[], channelType: string) {
    this.channelName = channelName;
    this.members = members;
    this.channelType = channelType
  }
}

export interface Channel {
  idChannel: number,
  channelName: string,
  lastMessage: string,
  channelType: string
  numberNewMessage: number,
}
