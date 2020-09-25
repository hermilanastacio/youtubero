import * as React from 'react';
import { useStore } from '../../../common/stores';
import VerticalCard from '../../VerticalCard/VerticalCard';
import { observer } from 'mobx-react';
import { EmptyMessage } from '../../Loader/LoadingSpinners';

const VideosQueue: React.FC = () => {
  const { videoStore } = useStore();

  return(
    <>
      {videoStore.videosQueue && videoStore.videosQueue.length > 0
        ? <React.Fragment>
            {videoStore.videosQueue 
              && videoStore.videosQueue.map((queue, i) => {
                return (
                  <VerticalCard 
                    thumbnailUrl={queue.thumbnailUrl} 
                    channelTitle={queue.channelTitle} 
                    publishedAt={queue.publishedAt}
                    title={queue.title} 
                    id={queue.id}
                    key={i}
                  />
                )
              })
            }
          </React.Fragment>
        : <EmptyMessage/>
      }
    </>
  );
};

export default observer(VideosQueue);
