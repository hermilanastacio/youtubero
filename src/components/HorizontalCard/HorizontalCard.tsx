import * as React from 'react';
import { Box } from '@material-ui/core';
import {
  viewCountFormatter,
  timeDurationFormatter,
  relativeDateFormatter
} from '../../common/utils';
import styles from './HorizontalCard.module.scss';

interface IHorizontalCard {
  video: any;
  withViews: boolean;
}

const HorizontalCard: React.FC<IHorizontalCard> = ({ video, withViews }) => {

  return (
    <div className={styles.cardContainer}>
      {/* THUMBNAIL START */}
        <div className={styles.thumbnailWrapper}>
          {withViews &&
            <Box className={styles.durationWrapper} fontSize={11}>
              {timeDurationFormatter(video.contentDetails.duration)}
            </Box>
          }
          <img 
            src={video.snippet.thumbnails.medium.url} 
            className={styles.imgThumbnail}
            alt="thumbnail" 
          />
        </div>
      {/* THUMBNAIL END */}

      <Box 
        fontWeight="fontWeightMedium" 
        className={styles.titleText} 
        title={video.snippet.title}
        fontSize={17} 
      >
        {video.snippet.title}
      </Box>
      <Box 
        fontWeight="fontWeightRegular" 
        className={styles.secondaryText} 
        fontSize={14} 
      >
        {video.snippet.channelTitle}
      </Box>

      {withViews
        ? <Box 
            fontWeight="fontWeightRegular" 
            className={styles.secondaryText}
            fontSize={14} 
          >
            {`${viewCountFormatter(video.statistics.viewCount)} views`}
          </Box>
        : <Box 
            fontWeight="fontWeightRegular"
            className={styles.secondaryText}
            fontSize={14} 
          >
            {relativeDateFormatter(video.snippet.publishedAt)}
          </Box>
      }
    </div>
  );
};

export default HorizontalCard;
