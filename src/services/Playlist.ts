import { createApi } from '../common/http-client';
import { AxiosInstance } from 'axios';
import config from '../config';

export default class Playlist {
  private instance: AxiosInstance;

  constructor() {
    this.instance = createApi(config.BASE_API_ENDPOINT);
  }

  public getAllMyPlaylist = async (accessToken: string) => {
    return this.instance.get(`playlists?part=contentDetails&part=snippet&mine=true&access_token=${accessToken}`);
  }

  public getAllPlaylistItemById = async (accessToken: string, playlistId: string) => {
    return this.instance.get(`playlistItems?part=snippet&playlistId=${playlistId}&access_token=${accessToken}`);
  }
};