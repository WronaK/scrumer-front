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
