import * as React from 'react';
import { Box } from '@material-ui/core';
import { useStore } from '../../common/stores';
import styles from './PlaylistCard.module.scss';

interface IPlaylistCard {
  thumbnailUrl: string;
  channelTitle: string;
  itemCount: number;
  title: string;
  id: string;
}

const PlaylistCard: React.FC<IPlaylistCard> = (props) => {
  const { playlistStore } = useStore();

  const handleClickPlaylist = (playlistId: string) => {
    playlistStore.setIsLoading(true);
    playlistStore.setChosenPlaylistId(playlistId);
  }

  return (
    <div 
      className={styles.playlistCardWrapper}
      onClick={() => handleClickPlaylist(props.id)}
    >
      <img 
        className={styles.playlistThumbnail}
        src={props.thumbnailUrl} 
        alt="Playlist Thubmnail"
      />
      <div>
        <Box 
          fontWeight="fontWeightMedium"
          fontSize={17} 
          ml={1}
        >
          {props.title}
        </Box>
        <Box 
          color="#606060"
          fontSize={14} 
          ml={1} 
        >
          {props.channelTitle}
        </Box>
        <Box 
          color="#606060"
          fontSize={14} 
          ml={1} 
        >
          {`${props.itemCount} ${props.itemCount > 1 
            ? 'videos' 
            : 'video'}`}
        </Box>
      </div>
    </div>
  );
};

export default PlaylistCard;
