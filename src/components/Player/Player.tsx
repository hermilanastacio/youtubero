/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect } from 'react';
import styles from './Player.module.scss';
import { observer } from 'mobx-react';
import { useStore } from '../../common/stores';
import MaximizedDetails from './MaximizedDetails/MaximizedDetails';
import MinimizedDetails from './MinimizedDetails/MinimizedDetails';
import { 
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Close as CloseIcon
} from '@material-ui/icons';
import YouTube from 'react-youtube';

const Player: React.FC = () => {
  const { modalStore, videoStore } = useStore();

  useEffect(() => {
    if(videoStore.currentlyPlayingVideoId) {
      videoStore.getRelatedVideosById(videoStore.currentlyPlayingVideoId)
    }
  },[videoStore.currentlyPlayingVideoId])

  const handleClose = () => {
    modalStore.setIsPlaying(false);
    videoStore.setIsMaximize(true);
  }

  const handleQueueing = () => {
    if(videoStore.videosQueue && videoStore.videosQueue.length > 0) {
      let nextVideoId = videoStore.takeVideoIdInQueue();
      videoStore.setCurrentlyPlayingVideoId(nextVideoId);
      videoStore.getVideoDetailsById(nextVideoId)
    }
  }

  return (
    <>
    {modalStore.isPlaying &&
      <div className={videoStore.isMaximize 
        ? styles.maximizedPlayer 
        : styles.minimizedPlayer}
      >
        {/* CONTROLS START */}
          <CloseIcon 
            onClick={handleClose}
            className={styles.closeIcon}
          />
          {videoStore.isMaximize
            ? <KeyboardArrowDownIcon 
                onClick={() => videoStore.setIsMaximize(false)} 
                className={styles.arrowToggle}
              />
            : <KeyboardArrowUpIcon 
                onClick={() => videoStore.setIsMaximize(true)} 
                className={styles.arrowToggle}
              />
          }
        {/* CONTROLS END */}

        {/* PLAYER START */}
          <div className={styles.playerWrapper}>
            <YouTube 
              videoId={videoStore.currentlyPlayingVideoId} 
              opts={{playerVars: {autoplay: 1}}}
              onEnd={handleQueueing}
            />
          </div>
        {/* PLAYER END */}
        
        <div className={styles.videoDetailsWrapper}>
          {videoStore.currentlyPlayingVideoDetails && videoStore.currentlyPlayingVideoDetails.length > 0 &&
            <React.Fragment>
              {videoStore.isMaximize
                ? <MaximizedDetails/>
                : <MinimizedDetails/>
              }
            </React.Fragment>
          }
        </div>
      </div>
    }
    </>
  );
};

export default observer(Player);
