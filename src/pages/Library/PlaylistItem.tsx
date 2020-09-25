/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect } from 'react';
import {
  NavigateBefore as NavigateBeforeIcon
} from '@material-ui/icons';
import { Box } from '@material-ui/core';
import { useStore } from '../../common/stores';
import { observer } from 'mobx-react';
import VerticalCard from '../../components/VerticalCard/VerticalCard';
import { 
  LoadingSpinner,
  EmptyMessage 
} from '../../components/Loader/LoadingSpinners';
import styles from './PlaylistItem.module.scss';
import config from '../../config';

const PlaylistItem: React.FC = () => {
  const { playlistStore, authStore } = useStore();

  useEffect(() => {
    playlistStore.getAllPlaylistItemById(authStore.accessToken, playlistStore.chosenPlaylistId)
  },[playlistStore.chosenPlaylistId]);

  const BackButton: React.FC = () => {
    return(
      <div 
        onClick={() => playlistStore.setChosenPlaylistId('')}
        className={styles.backBtnWrapper} 
      >
        <NavigateBeforeIcon/>
        <Box ml={-.5} fontSize={16}>Back</Box>
      </div>
    );
  }

  return(
    <div className={styles.playlistContainer}>
      {playlistStore.isLoading
        ? <LoadingSpinner/>
        : <React.Fragment>
            <BackButton/>
            {playlistStore.chosenPlaylistItem && playlistStore.chosenPlaylistItem.length > 0
              ? <React.Fragment>
                  {playlistStore.chosenPlaylistItem.map(p => {
                      return(
                        <VerticalCard 
                          thumbnailUrl={(p.snippet.thumbnails.medium && p.snippet.thumbnails.medium.url) 
                            || config.DEFAULT_THUMBNAIL_URL} 
                          publishedAt={p.snippet.publishedAt}
                          title={p.snippet.title} 
                          key={p.snippet.resourceId.videoId}
                          id={p.snippet.resourceId.videoId}
                          channelTitle={`added by ${p.snippet.channelTitle}`} 
                          viewCount={""}
                          duration={""} 
                        />
                      );
                    })
                  }
                </React.Fragment>
              : <EmptyMessage/>
            }
          </React.Fragment>
      }
    </div>
  );
};

export default observer(PlaylistItem);
