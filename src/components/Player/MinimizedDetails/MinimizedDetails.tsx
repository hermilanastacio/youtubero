import * as React from 'react';
import { useStore } from '../../../common/stores';
import { Typography } from '@material-ui/core';
import styles from './MinimizedDetails.module.scss';
import { 
  viewCountFormatter, 
  calendarTimeFormatter
} from '../../../common/utils';

const MinimizedDetails: React.FC = () => {
  const { videoStore } = useStore();

  return (
    <div className={styles.minimizedDetailsContainer}>
      <div className={styles.videoDetailsWrapper}>
        <Typography 
          title={videoStore.currentlyPlayingVideoDetails[0].snippet.title}
          noWrap={true} 
          variant="h6" 
        >
          {videoStore.currentlyPlayingVideoDetails[0].snippet.title}
        </Typography>
        <Typography 
          title={videoStore.currentlyPlayingVideoDetails[0].snippet.channelTitle}
          className={styles.textSecondary}
          variant="body2" 
          noWrap={true} 
        >
          {videoStore.currentlyPlayingVideoDetails[0].snippet.channelTitle}
        </Typography>
        <Typography 
          className={styles.textSecondary}
          variant="body2" 
          noWrap={true} 
        >
          {`${viewCountFormatter(videoStore.currentlyPlayingVideoDetails[0].statistics.viewCount)} views • 
          ${calendarTimeFormatter(videoStore.currentlyPlayingVideoDetails[0].snippet.publishedAt)}`}
        </Typography>
      </div>
    </div> 
  );
};

export default MinimizedDetails;
