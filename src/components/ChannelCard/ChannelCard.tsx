import * as React from 'react';
import { Avatar, Box } from '@material-ui/core';
import { calendarTimeFormatter } from '../../common/utils';
import styles from './ChannelCard.module.scss';
import { IChannelCard } from '../../interfaces/IChannel';

const ChannelCard: React.FC<IChannelCard> = (props) => {
  return (
    <div className={styles.cardContainer}>
      <Avatar 
        className={styles.channelLogo}
        src={props.thumbnailUrl}
        alt="Channel Logo" 
      />
      {/* CHANNEL DETAILS PORTION START */}
        <div className={styles.channelDetailsWrapper}>
          <Box 
            className={styles.truncateText} 
            fontWeight="fontWeightBold" 
            title={props.title}
            fontSize={17} 
          >
            {props.title}
          </Box>
          <Box 
            className={styles.truncateText}
            color="#606060"
            fontSize={14} 
            my={.5} 
          >
            {`${props.totalItemCount ? props.totalItemCount + ' videos • ' : ''}
             published ${calendarTimeFormatter(props.publishedAt)}`}
          </Box> 
          <Box 
            className={styles.truncateText} 
            fontSize={15} color="#606060" 
            title={props.description}
          >
            {props.description}
          </Box>
        </div>
      {/* CHANNEL DETAILS PORTION END */}
      <Box 
        className={styles.subscribedIndicator}
        fontWeight="fontWeightBold" 
        fontSize={13} 
        color="#fff" 
      >
        SUBSCRIBED
      </Box>
    </div>
  );
};

export default ChannelCard;
