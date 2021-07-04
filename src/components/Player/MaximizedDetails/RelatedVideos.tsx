import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { 
  LazyLoadingLoader, 
  LazyLoadingEndMessage 
} from '../../Loader/LoadingSpinners';
import { observer } from 'mobx-react';
import { useStore } from '../../../common/stores';
import VerticalCard from '../../VerticalCard/VerticalCard';

const RelatedVideos: React.FC = () => {
  const { videoStore } = useStore();

  const fetchMoreData = () => {
    videoStore.getRelatedVideosById(
      videoStore.currentlyPlayingVideoId, 
      videoStore.relatedVideosPageToken
    )
  };

  return(
    <>
      <InfiniteScroll
        scrollableTarget="playerScrollableDiv"
        loader={<LazyLoadingLoader/>}
        dataLength={videoStore.relatedVideos.length}
        next={fetchMoreData}
        hasMore={videoStore.relatedVideos.length === 0 
          || videoStore.relatedVideos.length < videoStore.relatedVideosTotalResults}
        endMessage={<LazyLoadingEndMessage/>}
      >
        {videoStore.relatedVideos && 
          videoStore.relatedVideos.map((video, i) => {
            if(video.snippet) {
              return (
                <VerticalCard 
                  thumbnailUrl={video.snippet.thumbnails.medium.url} 
                  channelTitle={video.snippet.channelTitle} 
                  publishedAt={video.snippet.publishedAt}
                  title={video.snippet.title} 
                  id={video.id.videoId}
                  key={i}
                />
              )
            }
          })
        }
      </InfiniteScroll>
    </>
  );
};

export default observer(RelatedVideos);
