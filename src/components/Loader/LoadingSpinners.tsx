import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import styles from './LoadingSpinners.module.scss';
import { 
  YoutubeSearchedFor as YoutubeSearchedForIcon 
} from '@material-ui/icons';
import { Box } from '@material-ui/core';

export const LazyLoadingLoader: React.FC = () => {
  return(
    <h1 className={styles.lazyLoadingSpinnerWrapper}>
      <CircularProgress 
        className={styles.loadingSpinner}
        color="secondary" 
        size={30} 
      />
    </h1>
  );
};

export const EmptyMessage: React.FC = () => {
  return(
    <div className={styles.emptyMessageWrapper}>
      <LazyLoadingEndMessage/>
    </div>
  );
}

export const LoadingSpinner: React.FC = () => {
  return(
    <div className={styles.loadingSpinnerWrapper}>
      <CircularProgress 
        className={styles.loadingSpinner}
        color="secondary" 
      />
    </div>
  );
}

export const LazyLoadingEndMessage: React.FC = () => {
  return(
    <p className={styles.endMessageWrapper}>
      <b>No more data available</b>
    </p>
  );
}

export const NoSearchResultMessage: React.FC = () => {
  return(
    <div className={styles.noResultMessageWrapper}>
      <YoutubeSearchedForIcon className={styles.magnifyIcon}/>
      <Box 
        fontWeight="fontWeightBold" 
        fontSize={17} 
        mb={.5}
      >
        No results found
      </Box>
      <Box 
        textAlign="center" 
        fontSize={13}
      >
        Try different keywords or remove search filters
      </Box>
    </div>
  );
}