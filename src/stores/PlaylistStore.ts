import { observable, action } from 'mobx';
import PlaylistService from '../services/Playlist';

interface IPlaylist {
  id: string;
  contentDetails: {
    itemCount: number;
  }
  snippet: {
    channelTitle: string;
    title: string;
    thumbnails: {
      medium: {
        url: string;
      }
    }
  }
}

interface IPlaylistItem {
  snippet: {
    title: string;
    channelTitle: string;
    resourceId: {
      videoId: string;
    }
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      }
    }
  }
}

export class PlaylistStore {
  private playlistService: PlaylistService;

  constructor() {
    this.playlistService = new PlaylistService();
  }

  @observable
  public isLoading: boolean = false;

  @observable
  public myPlaylist: Array<IPlaylist> = [];

  @observable
  public chosenPlaylistItem: Array<IPlaylistItem> = [];

  @observable
  public chosenPlaylistId: string = "";

  @action
  public setMyPlaylist(playlist: Array<IPlaylist>) {
    this.myPlaylist = playlist;
  }

  @action
  public setIsLoading(state: boolean) {
    this.isLoading = state;
  }

  @action
  public setChonsenPlaylistItem(playlistItem: Array<IPlaylistItem>) {
    this.chosenPlaylistItem = playlistItem;
  }

  @action
  public setChosenPlaylistId(id: string) {
    this.chosenPlaylistId = id;
  }

  @action
  public async getAllMyPlaylist(accessToken: string) {
    try {
      let { items }: any = await this.playlistService.getAllMyPlaylist(accessToken);
      this.setMyPlaylist(items);
    } catch (error) {
      console.log(error);
    }
  }

  @action
  public async getAllPlaylistItemById(accessToken: string, playlistId: string) {
    try {
      let { items }: any = await this.playlistService.getAllPlaylistItemById(accessToken, playlistId);
      this.setChonsenPlaylistItem(items);
      this.setIsLoading(false);
    } catch (error) {
      console.log(error);
      this.setIsLoading(false);
    }
  }
}
