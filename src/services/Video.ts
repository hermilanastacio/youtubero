import { createApi } from '../common/http-client';
import { AxiosInstance } from 'axios';
import config from '../config';

export default class Account {
  private instance: AxiosInstance;

  constructor() {
    this.instance = createApi(config.BASE_API_ENDPOINT);
  }

  public getTrendingVideos = async () => {
    return this.instance.get(`/videos?part=snippet,contentDetails,statistics&chart=mostPopular&key=${process.env.REACT_APP_API_KEY}&regionCode=${process.env.REACT_APP_DEFAULT_REGION_CODE}&maxResults=${config.DEFAULT_MAX_RESULT}`);
  }

  public getBreakingNews = async () => {
    return this.instance.get(`/search?part=snippet&q=news&topicId=GCQmVzdCBvZiBZb3VUdWJl&key=${process.env.REACT_APP_API_KEY}&order=date&regionCode=${process.env.REACT_APP_DEFAULT_REGION_CODE}&maxResults=${config.DEFAULT_MAX_RESULT}`);
  }

  public getSuggestedVideos = async () => {
    return this.instance.get(`/search?part=snippet&key=${process.env.REACT_APP_API_KEY}&relatedToVideoId=wtLJPvx7-ys&type=video&maxResults=${config.DEFAULT_MAX_RESULT}`);
  }

  public getVideoDetailsById = async (id: string) => {
    return this.instance.get(`/videos?part=snippet,contentDetails,statistics&id=${id}&key=${process.env.REACT_APP_API_KEY}`);
  }

  public getChannelDetailsById = async (id: string) => {
    return this.instance.get(`/channels?part=snippet,statistics&id=${id}&key=${process.env.REACT_APP_API_KEY}`);
  }

  public getVideosByCategoryId = async (categoryId: number, pageToken?: string) => {
    return this.instance.get(`/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${process.env.REACT_APP_DEFAULT_REGION_CODE}&videoCategoryId=${categoryId}&maxResults=${config.DEFAULT_MAX_RESULT}&${pageToken ? `pageToken=${pageToken}&` : ''}key=${process.env.REACT_APP_API_KEY}`);
  }

  public getRelatedVideosById = async (videoId: string, pageToken?: string) => {
    return this.instance.get(`/search?part=snippet&maxResults=${config.DEFAULT_MAX_RESULT}&relatedToVideoId=${videoId}&type=video&${pageToken ? `pageToken=${pageToken}&` : ''}key=${process.env.REACT_APP_API_KEY}`);
  }

  public searchVideoByKeyword = async (key: string, pageToken?: string) => {
    return this.instance.get(`/search?part=snippet&q=${key}&maxResults=${config.DEFAULT_MAX_RESULT}&type=video&${pageToken ? `pageToken=${pageToken}&` : ''}key=${process.env.REACT_APP_API_KEY}`);
  }
};
