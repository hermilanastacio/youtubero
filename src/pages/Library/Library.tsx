/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect } from 'react';
import {
  OndemandVideo as OndemandVideoIcon,
  ThumbUp as ThumbUpIcon
} from '@material-ui/icons';
import { 
  ListItemText, 
  ListItemIcon, 
  ListItem, 
  Divider, 
  List, 
  Box
} from '@material-ui/core';
import { useStore } from '../../common/stores';
import { observer } from 'mobx-react';
import PlaylistItem from './PlaylistItem';
import styles from './Library.module.scss';
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';

const Library: React.FC = () => {
  const { playlistStore, channelStore, authStore } = useStore();

  useEffect(() => {
    playlistStore.getAllMyPlaylist(authStore.accessToken)
  },[]);

  const handleGetYourVideos = () => {
    playlistStore.setIsLoading(true);

    if(channelStore.myChannelDetails) {
      playlistStore.setChosenPlaylistId(
        channelStore.myChannelDetails[0].contentDetails.relatedPlaylists.uploads
      );
    }
  }

  const handleGetLikedVideos = () => {
    playlistStore.setIsLoading(true);
    playlistStore.setChosenPlaylistId(
      channelStore.myChannelDetails[0].contentDetails.relatedPlaylists.likes
    );
  }
  
  return(
    <div className={styles.libraryContainer}>
      {!playlistStore.chosenPlaylistId
        ? <React.Fragment> 
            <List component="nav">
              <ListItem onClick={handleGetYourVideos} button>
                <ListItemIcon>
                  <OndemandVideoIcon />
                </ListItemIcon>
                <ListItemText primary="Your videos"/>
              </ListItem>
              <ListItem onClick={handleGetLikedVideos} button>
                <ListItemIcon>
                  <ThumbUpIcon />
                </ListItemIcon> 
                <ListItemText primary="Liked videos" />
              </ListItem>
            </List>
            <Divider/>
            <div className={styles.playlistWrapper}>
              {playlistStore.myPlaylist.length > 0 && <Box>Playlists</Box>}
              {playlistStore.myPlaylist.map(p => {
                return(
                  <PlaylistCard
                    thumbnailUrl={p.snippet.thumbnails.medium.url}
                    itemCount={p.contentDetails.itemCount}
                    channelTitle={p.snippet.channelTitle}
                    title={p.snippet.title}
                    key={p.id}
                    id={p.id}
                  />
                );
              })}
            </div>
          </React.Fragment>
        : <PlaylistItem/>
      }
    </div>
  );
};

export default observer(Library);
