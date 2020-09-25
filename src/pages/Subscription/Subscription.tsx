/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../common/stores';
import InfiniteScroll from 'react-infinite-scroll-component';
import { 
  LazyLoadingLoader, 
  LazyLoadingEndMessage 
} from '../../components/Loader/LoadingSpinners';
import ChannelCard from '../../components/ChannelCard/ChannelCard';
import styles from './Subscription.module.scss';

const Subscription: React.FC = () => {
  const { channelStore, authStore } = useStore();

  useEffect(() => {
    channelStore.getSubscribedChannels(authStore.accessToken);
  },[]);

  const fetchMoreData = () => {
    channelStore.getSubscribedChannels(authStore.accessToken,
    channelStore.nextPageToken)
  };

  return(
    <div 
      className={styles.subscriptionContainer}
      id="subscriptionScrollableDiv" 
    >
      <InfiniteScroll
        scrollableTarget="subscriptionScrollableDiv"
        loader={<LazyLoadingLoader/>}
        dataLength={channelStore.subscribedChannels.length}
        next={fetchMoreData}
        hasMore={channelStore.subscribedChannels.length === 0 
          || channelStore.subscribedChannels.length < channelStore.totalResults}
        endMessage={<LazyLoadingEndMessage/>}
      >
        {channelStore.subscribedChannels 
          && channelStore.subscribedChannels.map((s, i) => {
            return(
              <ChannelCard
                totalItemCount={s.contentDetails.totalItemCount}
                thumbnailUrl={s.snippet.thumbnails.default.url}
                channelId={s.snippet.resourceId.channelId}
                publishedAt={s.snippet.publishedAt}
                description={s.snippet.description}
                title={s.snippet.title}
                key={i}
              />
            ) 
          })
        }
      </InfiniteScroll>
    </div>
  );
};

export default observer(Subscription);
