import { observable, action } from 'mobx';
import ChannelService from '../services/Channel';
import { ISubcribedChannels } from '../interfaces/IChannel';
import { persist } from 'mobx-persist';

interface IMyChannelDetails {
  contentDetails: {
    relatedPlaylists:{ 
      uploads: string;
      likes: string;
    }
    id: string;
  }
}

export class ChannelStore {
  private channelService: ChannelService;

  constructor() {
    this.channelService = new ChannelService();
  }

  @observable
  public totalResults: number = 0;

  @persist("list")
  @observable
  public myChannelDetails: Array<IMyChannelDetails> = [];

  @observable
  public nextPageToken: string = "";

  @observable
  public subscribedChannels: Array<ISubcribedChannels> = [];

  @action
  public setSubscribedChannels(items: Array<ISubcribedChannels>) {
    this.subscribedChannels = items;
  }

  @action
  public setMyChannelDetails(items: Array<IMyChannelDetails>) {
    this.myChannelDetails = items;
  }

  @action
  public spreadSubscribedChannels(items: Array<ISubcribedChannels>) {
    this.subscribedChannels = [ ...this.subscribedChannels, ...items ];
  }

  @action
  public setNextPageToken(token: string) {
    this.nextPageToken = token;
  }

  @action
  public setTotalResults(count: number) {
    this.totalResults = count;
  }

  @action
  public async getSubscribedChannels(accessToken: string, pageToken?: string) {
    try {
      let { items, pageInfo, nextPageToken } :any = await this.channelService.getSubscribedChannels(accessToken, pageToken);

      if(!pageToken) {
        this.setSubscribedChannels(items);
        this.setTotalResults(pageInfo.totalResults);
      } else {
        this.spreadSubscribedChannels(items)
      }
      this.setNextPageToken(nextPageToken);
    } catch (error) {
      console.log(error);
    }
  }

  @action
  public async getMyChannelDetails(accessToken: string) {
    try {
      let { items } :any = await this.channelService.getMyChannelDetails(accessToken);
      this.setMyChannelDetails(items);
      console.log(items);
    } catch (error) {
      console.log(error);
    }
  }
}
