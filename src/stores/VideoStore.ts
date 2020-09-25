import { observable, action } from 'mobx';
import VideoService from '../services/Video';
import { 
  IVideo,
  ITrendingVideos, 
  IBreakingNews, 
  IExploredVideos,
  ISuggestedVideos,
  IChannelDetails,
  IRelatedVideos,
  ISearchedVideos,
  IClickedVideo
} from '../interfaces/IVideos';
import { persist } from 'mobx-persist';

export class VideoStore {
  private videoService: VideoService;

  constructor() {
    this.videoService = new VideoService();
  }

  @observable
  public videosQueue: Array<IClickedVideo>  = [];

  @observable
  // 1 - Related Videos | 2 - Videos in queue
  public maximizedDetailsActiveTab: number = 1;

  @observable
  public isMaximize: boolean = true;

  @observable
  public isLoading: boolean = false;

  @observable
  public pageToken: string = "";

  @observable
  public clickedVideoDetails: IClickedVideo = {
    channelTitle: "",
    id: "",
    publishedAt: "",
    thumbnailUrl: "",
    title:  ""
  };

  @observable
  public relatedVideosPageToken: string = "";

  @observable
  public searchedVideosPageToken: string = "";

  @observable
  public totalResults: number = 0;

  @observable
  public relatedVideosTotalResults: number = 0;

  @observable
  public searchedVideosTotalResults: number = 0;

  @observable
  public currentlyPlayingVideoId: string = "";

  @observable
  public currentlyPlayingVideoDetails: Array<IVideo> = [];

  @observable
  public currentlyPlayingVideoChannelDetails: Array<IChannelDetails> = [];

  @persist("list")
  @observable
  public searchedVideos: Array<ISearchedVideos> = [];

  @observable
  public trendingVideos: Array<ITrendingVideos> = [];

  @observable
  public exploredVideos: Array<IExploredVideos> = [];

  @observable
  public breakingNews: Array<IBreakingNews> = [];

  @observable
  public suggestedVideos: Array<ISuggestedVideos> = [];

  @observable
  public relatedVideos: Array<IRelatedVideos> = [];

  @action
  public setIsMaximize(state: boolean) {
    this.isMaximize = state;
  }

  @action
  public setMaximizedDetailsActiveTab(tab: number) {
    this.maximizedDetailsActiveTab = tab;
  }

  @action
  public addVideoToQueue(video: any) {
    let isExist = this.videosQueue.findIndex(v => v.id === video.id);

    if(isExist < 0) {
      this.videosQueue.push(video)
      return true;
    } else {
      return false;
    }
  }

  @action
  public removeVideoInQueue(video: any) {
    try {
      this.videosQueue = this.videosQueue.filter(v => v.id !== video.id);
      return true;
    } catch (error) {
      return false;
    }
  }

  @action
  public takeVideoIdInQueue() {
    let nextVideo = this.videosQueue.shift();
    return nextVideo.id
  }

  @action
  public setClickVideoDetails(video: any) {
    this.clickedVideoDetails = video;
  }

  @action
  public setPageToken(token: string) {
    this.pageToken = token;
  }

  @action
  public setSearchedVideosPageToken(token: string) {
    this.searchedVideosPageToken = token;
  }

  @action
  public setRelatedVideosPageToken(token: string) {
    this.relatedVideosPageToken = token;
  }

  @action
  public setIsLoading(state: boolean) {
    this.isLoading = state;
  }

  @action
  public setTotalResults(count: number) {
    this.totalResults = count;
  }

  @action
  public setRelatedVideosTotalResults(count: number) {
    this.relatedVideosTotalResults = count;
  }

  @action
  public setSearchedVideosTotalResults(count: number) {
    this.searchedVideosTotalResults = count;
  }

  @action
  public setCurrentlyPlayingVideoId(id: any) {
    this.currentlyPlayingVideoId = id;
  }

  @action
  public setCurrentlyPlayingVideoDetails(items: Array<IVideo>) {
    this.currentlyPlayingVideoDetails = items;
    this.getVideoChannelDetailsById(items[0].snippet.channelId)
  }

  @action
  public setCurrentlyPlayingVideoChannelDetails(items: Array<IChannelDetails>) {
    this.currentlyPlayingVideoChannelDetails = items;
  }

  @action
  public setTrendingVideos(items: Array<ITrendingVideos>) {
    this.trendingVideos = items;
  }

  @action
  public setBreakingNews(items: Array<IBreakingNews>) {
    this.breakingNews = items;
  }

  @action
  public setRelatedVideos(items: Array<IRelatedVideos>) {
    this.relatedVideos = items;
  }

  @action
  public spreadRelatedVideos(items: Array<IRelatedVideos>) {
    this.relatedVideos = [ ...this.relatedVideos, ...items];
  }

  @action
  public setExploredVideos(items: Array<IExploredVideos>) {
    this.exploredVideos = items;
  }

  @action
  public setSearchedVideos(items: Array<ISearchedVideos>) {
    this.searchedVideos = items;
  }

  @action
  public spreadSearchedVideos(items: Array<ISearchedVideos>) {
    this.searchedVideos = [...this.searchedVideos, ...items];
  }

  @action
  public spreadExploredVideos(items: Array<IExploredVideos>) {
    this.exploredVideos = [...this.exploredVideos, ...items];
  }

  @action
  public setSuggestedVideos(items: Array<IBreakingNews>) {
    this.suggestedVideos = items;
  }

  @action
  public async getTrendingVideos() {
    try {
      let { items }: any = await this.videoService.getTrendingVideos();
      this.setTrendingVideos(items);
    } catch (error) {
      console.log(error);
    }
  }

  @action
  public async getBreakingNews() {
    try {
      let { items }: any = await this.videoService.getBreakingNews();
      this.setBreakingNews(items);
    } catch (error) {
      console.log(error);
    }
  }

  @action
  public async getSuggestedVideos() {
    try {
      let { items }: any = await this.videoService.getSuggestedVideos();
      this.setSuggestedVideos(items);
    } catch (error) {
      console.log(error);
    }
  }

  @action
  public async getVideosByCategoryId(categoryId: number, pageToken?: string) {
    !pageToken && this.setIsLoading(true);
    
    try {
      let { items, nextPageToken, pageInfo }: any = await this.videoService.getVideosByCategoryId(categoryId, pageToken);
      if(!pageToken) {
        this.setExploredVideos(items);
        this.setTotalResults(pageInfo.totalResults)
      } else {
        this.spreadExploredVideos(items)
      }
      this.setPageToken(nextPageToken);
      this.setIsLoading(false);
    } catch (error) {
      console.log(error);
      this.setIsLoading(false);
    }
  }

  @action
  public async getRelatedVideosById(videoId: string, pageToken?: string) {
    !pageToken && this.setIsLoading(true);

    try {
      let { items, nextPageToken, pageInfo }: any = await this.videoService.getRelatedVideosById(videoId, pageToken);
      if(!pageToken) {
        this.setRelatedVideos(items);
        this.setRelatedVideosTotalResults(pageInfo.totalResults)
      } else {
        this.spreadRelatedVideos(items)
      }
      this.setRelatedVideosPageToken(nextPageToken);
      this.setIsLoading(false);
    } catch (error) {
      console.log(error);
      this.setIsLoading(false);
    }
  }


  @action
  public async getVideoChannelDetailsById(channelId: any) {
    try {
      let { items }: any = await this.videoService.getChannelDetailsById(channelId);
      this.setCurrentlyPlayingVideoChannelDetails(items);
    } catch (error) {
      console.log(error);
    }
  }

  @action
  public async getVideoDetailsById(id: any) {
    try {
      let { items }: any = await this.videoService.getVideoDetailsById(id);
      this.setCurrentlyPlayingVideoDetails(items);
    } catch (error) {
      console.log(error);
    }
  }

  @action
  public async searchVideoByKeyword(key: string, pageToken?: string) {
    !pageToken && this.setIsLoading(true);

    try {
      let { items, nextPageToken, pageInfo }: any = await this.videoService.searchVideoByKeyword(key, pageToken);
      if(!pageToken) {
        this.setSearchedVideos(items);
        this.setSearchedVideosTotalResults(pageInfo.totalResults)
      } else {
        this.spreadSearchedVideos(items)
      }
      this.setSearchedVideosPageToken(nextPageToken)
      this.setIsLoading(false);
    } catch (error) {
      console.log(error);
      this.setIsLoading(false);
    }
  }
}
