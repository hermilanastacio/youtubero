import * as React from 'react';
import { useStore } from '../../common/stores';
import {  MoreVert as MoreVertIcon } from '@material-ui/icons';
import { Box, IconButton } from '@material-ui/core';
import styles from './VerticalCard.module.scss';
import { 
  viewCountFormatter, 
  relativeDateFormatter,
  timeDurationFormatter
} from '../../common/utils';

interface IVerticalCard {
  id: string;
  duration?: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  viewCount?: string;
  publishedAt: string;
}

const VerticalCard: React.FC<IVerticalCard> = (props) => {
  const { videoStore, modalStore } = useStore();

  const handleClickOptions = (e) => {
    e.stopPropagation();
    modalStore.setAnchorEl(e.currentTarget);
    videoStore.setClickVideoDetails(props);
  }

  return(
    <div 
      onClick={() => {
        videoStore.setCurrentlyPlayingVideoId(props.id)
        videoStore.getVideoDetailsById(props.id)
        videoStore.setIsMaximize(true)
        modalStore.setIsPlaying(true);
      }}
      className={styles.verticalCardWrapper} 
    >
      <div className={styles.thumbnailWrapper}>
        {props.duration && 
          <Box className={styles.durationWrapper} fontSize={11}>
            {timeDurationFormatter(props.duration)}
          </Box>
        }
        <img 
          src={props.thumbnailUrl} 
          className={styles.imgThumbnail}
          alt="thumbnail"
        />
      </div> 
      <div className={styles.cardDetailsWrapper}>
        <Box 
          className={styles.truncateText}
          fontWeight="fontWeightMedium" 
          fontSize={17}
        >
          {props.title}
        </Box>
        <Box 
          fontWeight="fontWeightRegular" 
          color="#606060"
          fontSize={14} 
        >
          {props.channelTitle}
        </Box>
        <Box 
          fontWeight="fontWeightRegular" 
          color="#606060"
          fontSize={13} 
        >
          {`${relativeDateFormatter(props.publishedAt)} ${props.viewCount ? ' • ' + viewCountFormatter(props.viewCount) + ' views' : ''}`}
        </Box>
      </div>
      <IconButton 
        onClick={(e) => handleClickOptions(e)} 
        className={styles.contextWrapper}
        color="inherit"
      >
        <MoreVertIcon/>
      </IconButton>
    </div>
  );
};

export default VerticalCard;
