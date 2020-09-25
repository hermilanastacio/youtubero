/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useStore } from '../../common/stores';
import { Box } from '@material-ui/core';
import { 
  LazyLoadingEndMessage, 
  LazyLoadingLoader, 
  LoadingSpinner
} from '../../components/Loader/LoadingSpinners';
import styles from './Explore.module.scss';
import { observer } from 'mobx-react';
import VerticalCard from '../../components/VerticalCard/VerticalCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CategoryType } from '../../common/types';
import { 
  Headset as HeadsetIcon,
  SportsEsports as SportsEsportsIcon,
  DirectionsCar as DirectionsCarIcon,
  SportsBasketball as SportsBasketballIcon,
  SentimentVerySatisfied as SentimentVerySatisfiedIcon
} from '@material-ui/icons';

const Explore: React.FC = () => {
  const { videoStore, modalStore } = useStore();
  const currentCategory = useRef(modalStore.activeCategory);

  const fetchMoreData = () => {
    videoStore.getVideosByCategoryId(modalStore.activeCategory, videoStore.pageToken)
  };

  useEffect(() => {
    if(videoStore.exploredVideos.length < 1) {
      videoStore.getVideosByCategoryId(modalStore.activeCategory);
    }
  },[])

  useEffect(() => {
    if(currentCategory.current !== modalStore.activeCategory) {
      videoStore.getVideosByCategoryId(modalStore.activeCategory);
    }
  },[modalStore.activeCategory])

  const Category = (props) => {
    return(
      <div 
        className={`${styles.iconWrapper} 
          ${modalStore.activeCategory === props.value ? styles.active : ''}`}
        onClick={() => modalStore.setActiveCategory(props.value)} 
      >
        {props.icon}
        <Box 
          fontSize={14}
          mt={.5} 
        >
          {CategoryType[props.value]}
        </Box>
      </div>
    );
  }

  return(
    <div className={styles.exploreContainer}>
      <div className={styles.iconSection}>
        <Category icon={<HeadsetIcon className={styles.categoryIcon}/>} value={CategoryType.Music} alt="Music Icon"/>
        <Category icon={<SportsEsportsIcon className={styles.categoryIcon}/>} value={CategoryType.Gaming} alt="Music Icon"/>
        <Category icon={<DirectionsCarIcon className={styles.categoryIcon}/>} value={CategoryType.Vehicles} alt="Gaming Icon"/>
        <Category icon={<SportsBasketballIcon className={styles.categoryIcon}/>} value={CategoryType.Sports} alt="Gaming Icon"/>
        <Category icon={<SentimentVerySatisfiedIcon className={styles.categoryIcon}/>} value={CategoryType.Comedy} alt="Gaming Icon"/>
      </div>
      <div className={styles.scrollableSection}>
        <div 
          className={styles.verticalScrollableListWrapper}
          id="explorePageScrollableDiv" 
        >
          {videoStore.isLoading
          ? <LoadingSpinner/>
          : <InfiniteScroll
              scrollableTarget="explorePageScrollableDiv"
              loader={<LazyLoadingLoader/>}
              dataLength={videoStore.exploredVideos.length}
              next={fetchMoreData}
              hasMore={videoStore.exploredVideos.length === 0 
                || videoStore.exploredVideos.length < videoStore.totalResults}
              endMessage={<LazyLoadingEndMessage/>}
            >
              {videoStore.exploredVideos.map(video => {
                  return(
                    <VerticalCard 
                      thumbnailUrl={video.snippet.thumbnails.medium.url} 
                      channelTitle={video.snippet.channelTitle} 
                      duration={video.contentDetails.duration} 
                      viewCount={video.statistics.viewCount}
                      publishedAt={video.snippet.publishedAt}
                      title={video.snippet.title} 
                      key={video.id}
                      id={video.id}
                    />
                  ) 
                })
              }
            </InfiniteScroll>
          }
        </div>
      </div>
    </div>
  );
};

export default observer(Explore);
