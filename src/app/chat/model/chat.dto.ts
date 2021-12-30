export interface ChatNotification {
  channelId: number,
  messageId: string
}

export interface CreateChannel {
  channelName: string
  members: number[]
  channelType: ChannelType
}

export interface Channel {
  idChannel: number,
  channelName: string,
  lastMessage: string,
  channelType: string
  numberNewMessage: number,
}

export enum ChannelType {
  PRIVATE_MESSAGES = "PRIVATE_MESSAGES",
  GROUP_CHANNEL = "GROUP_CHANNEL"
}
