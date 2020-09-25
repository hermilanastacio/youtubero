import { createContext, useContext } from 'react';
import { ModalStore } from '../stores/ModalStore';
import { AuthStore } from '../stores/AuthStore';
import { VideoStore } from '../stores/VideoStore';
import { ChannelStore } from '../stores/ChannelStore';
import { PlaylistStore } from '../stores/PlaylistStore';
import { create } from 'mobx-persist';
import config from '../config/index';
import { configure } from 'mobx';

const hydrate = create({
  storage: localStorage,
  jsonify: true
});

configure({ enforceActions: 'always' });

export class RootStore {
  public modalStore = new ModalStore();
  public authStore = new AuthStore();
  public videoStore = new VideoStore();
  public channelStore = new ChannelStore();
  public playlistStore = new PlaylistStore();

  constructor() {
    hydrate(config.LOCALSTORAGE_KEY, this.authStore);
    hydrate(config.SEARCH_RESULTS_KEY, this.videoStore);
    hydrate(config.CHANNEL_DETAILS_KEY, this.channelStore);
  }
}

export const rootStore = new RootStore();

export const RootStoreContext = createContext(rootStore);

export const useStore = (): RootStore => useContext(RootStoreContext);