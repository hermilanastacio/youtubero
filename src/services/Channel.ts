import { createApi } from '../common/http-client';
import { AxiosInstance } from 'axios';
import config from '../config';

export default class Channel {
  private instance: AxiosInstance;

  constructor() {
    this.instance = createApi(config.BASE_API_ENDPOINT);
  }

  public getSubscribedChannels = async (accessToken: string, pageToken?: string) => {
    return this.instance.get(`subscriptions?part=snippet,contentDetails&maxResults=${config.DEFAULT_MAX_RESULT}&mine=true&${pageToken ? `pageToken=${pageToken}&` : ''}&access_token=${accessToken}`);
  }

  public getMyChannelDetails = async (accessToken: string) => {
    return this.instance.get(`channels?part=contentDetails,snippet&mine=true&access_token=${accessToken}`);
  }
};