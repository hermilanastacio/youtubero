import * as React from 'react';
import { useStore } from '../../../common/stores';
import { Box, Avatar } from '@material-ui/core';
import styles from './MaximizedDetails.module.scss';
import { 
  viewCountFormatter, 
  calendarTimeFormatter,
} from '../../../common/utils';
import {LoadingSpinner } from '../../Loader/LoadingSpinners';
import RelatedVideos from './RelatedVideos';
import VideosQueue from './VideosQueue';
import { observer } from 'mobx-react';
import CustomBadge from './CustomBadge';

const MaximizedDetails: React.FC = () => {
  const { videoStore } = useStore();

  return (
    <div className={styles.maximizedDetailsContainer}>
      <div className={styles.detailsWrapper}>
        {/* VIDEO DETAILS START */}
        <div className={styles.videoDetailsWrapper}>
          <Box 
            className={styles.truncateText}
            fontWeight="fontWeightMedium" 
            fontSize={17} 
          >
            {`${videoStore.currentlyPlayingVideoDetails[0].snippet.title}`}
          </Box>
          <Box 
            className={styles.truncateText} 
            fontWeight="fontWeightRegular" 
            color="#606060"
            fontSize={14} 
          >
            {`${viewCountFormatter(videoStore.currentlyPlayingVideoDetails[0].statistics.viewCount)} views • 
              ${calendarTimeFormatter(videoStore.currentlyPlayingVideoDetails[0].snippet.publishedAt)}`}
          </Box>
        </div>
        {/* VIDEO DETAILS END */}

        {/* UPLOADER DETAILS START */}
        <div className={styles.uploaderDetailsWrapper}>
          <Avatar 
            src={videoStore.currentlyPlayingVideoChannelDetails 
              && videoStore.currentlyPlayingVideoChannelDetails.length > 0 
              ? videoStore.currentlyPlayingVideoChannelDetails[0].snippet.thumbnails.default.url
              : "" }
            alt="Channel Logo" 
          />
          <div className={styles.channelDetailsWrapper}>
            <Box 
              className={styles.truncateText}
              fontWeight="fontWeightMedium" 
              fontSize={17} 
            >
              {videoStore.currentlyPlayingVideoDetails[0].snippet.channelTitle}
            </Box>
            <Box 
              fontWeight="fontWeightRegular" 
              fontSize={14} 
              color="#606060"
            >
              {videoStore.currentlyPlayingVideoChannelDetails 
                && videoStore.currentlyPlayingVideoChannelDetails.length > 0 
                && `${viewCountFormatter(videoStore.currentlyPlayingVideoChannelDetails[0].statistics.subscriberCount)} subscribers`}
            </Box>
          </div>
        </div>
        {/* UPLOADER DETAILS END */}

        <div className={styles.videoTabWrapper}>
          <Box 
            onClick={() => videoStore.setMaximizedDetailsActiveTab(1)} 
            style={{}} 
            className={`${styles.tabTextFormat} ${videoStore.maximizedDetailsActiveTab === 1
              ? styles.activeVideosTab 
              : ''}`}
            fontWeight="fontWeightBold"
            fontSize={14}
          >
              Related Videos
          </Box>
          <Box 
            onClick={() => videoStore.setMaximizedDetailsActiveTab(2)} 
            className={`${styles.tabTextFormat} ${videoStore.maximizedDetailsActiveTab === 2
              ? styles.activeVideosTab 
              : ''}`}
            fontWeight="fontWeightBold" 
            fontSize={14}
          >
            Videos in queue 
            {videoStore.videosQueue && videoStore.videosQueue.length > 0 && <CustomBadge/>}
          </Box>
        </div>
        
        {/* SCROLLABLE VERTICAL VIDEO LIST START */}
        <div
          className={styles.verticalScrollableListWrapper}
          id="playerScrollableDiv"  
        >
          {videoStore.isLoading
            ? <LoadingSpinner/>
            : <React.Fragment>
                {videoStore.maximizedDetailsActiveTab === 1
                  ? <RelatedVideos/>
                  : <VideosQueue/>
                }
              </React.Fragment>
          }
        </div>
        {/* SCROLLABLE VERTICAL VIDEO LIST END */}
      </div>
    </div>
  );
};

export default observer(MaximizedDetails);
