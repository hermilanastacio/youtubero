import * as React from 'react';
import { useStore } from '../../common/stores';
import { observer } from 'mobx-react';
import VerticalCard from '../../components/VerticalCard/VerticalCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { 
  LazyLoadingLoader, 
  LazyLoadingEndMessage, 
  LoadingSpinner, 
  NoSearchResultMessage
} from '../../components/Loader/LoadingSpinners';
import styles from './SearchList.module.scss';

const SearchList: React.FC = () => {
  const { videoStore, modalStore } = useStore();

  const fetchMoreData = () => {
    videoStore.searchVideoByKeyword(modalStore.searchKey, videoStore.searchedVideosPageToken)
  };

  return(
    <div 
      className={styles.searchListWrapper}
      id="searchPageScrollableDiv" 
    >
      {videoStore.isLoading && <LoadingSpinner/>}
      {!videoStore.isLoading && videoStore.searchedVideos.length > 0
        ? 
          <InfiniteScroll
            scrollableTarget="searchPageScrollableDiv"
            loader={<LazyLoadingLoader/>}
            dataLength={videoStore.searchedVideos.length}
            next={fetchMoreData}
            hasMore={videoStore.searchedVideos.length === 0 
              || videoStore.searchedVideos.length < videoStore.searchedVideosTotalResults}
            endMessage={<LazyLoadingEndMessage/>}
          >
            {videoStore.searchedVideos.map((vid, i) => {
              return(
                <VerticalCard 
                  thumbnailUrl={vid.snippet.thumbnails.medium.url} 
                  channelTitle={vid.snippet.channelTitle} 
                  publishedAt={vid.snippet.publishedAt}
                  title={vid.snippet.title} 
                  id={vid.id.videoId}
                  viewCount=""
                  duration="" 
                  key={i}
                />
              );
            })}
          </InfiniteScroll>
        : <NoSearchResultMessage/>
      }
    </div>
  );
};

export default observer(SearchList);
