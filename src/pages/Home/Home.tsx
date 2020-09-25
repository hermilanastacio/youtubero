/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect } from 'react';
import { Box } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { useStore } from '../../common/stores';
import { 
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon
} from '@material-ui/icons';
import { observer } from 'mobx-react';
import HorizontalCard from '../../components/HorizontalCard/HorizontalCard';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const { videoStore, modalStore } = useStore();

  useEffect(() => {
    // videoStore.getTrendingVideos();
    // videoStore.getBreakingNews();
    // videoStore.getSuggestedVideos();
  },[])

  const renderTrendingVideos = () =>
    videoStore.trendingVideos.map(trend => {
      return <HorizontalCard video={trend} withViews={true} key={trend.id}/>;
    }
  );

  const renderBreakingNews = () =>
    videoStore.breakingNews.map(news => {
      return <HorizontalCard video={news} withViews={false} key={news.id.videoId}/>;
    }
  );

  const renderSuggestedVideos = () =>
    videoStore.searchedVideos.map(suggested => {
      return <HorizontalCard video={suggested} withViews={false} key={suggested.id.videoId}/>;
    }
  );

  const handleSelectVideo = (e: any) => {
    videoStore.setCurrentlyPlayingVideoId(e);
    videoStore.getVideoDetailsById(e);
    videoStore.setIsMaximize(true);
    modalStore.setIsPlaying(true);
  }

  return (
    <div className={styles.homeContainer}>
      <Box fontWeight="fontWeightMedium" mt={2} ml={1}>Trending Videos</Box>
      <ScrollMenu
        onSelect={e => handleSelectVideo(e)}
        arrowLeft={<NavigateBeforeIcon/>}
        arrowRight={<NavigateNextIcon/>}
        data={renderTrendingVideos()}
      />

      <Box fontWeight="fontWeightMedium" mt={2} ml={1}>Breaking News</Box>
      <ScrollMenu
        onSelect={e => handleSelectVideo(e)}
        arrowLeft={<NavigateBeforeIcon/>}
        arrowRight={<NavigateNextIcon/>}
        data={renderBreakingNews()}
      />

      {videoStore.searchedVideos && videoStore.searchedVideos.length > 0 && 
        <React.Fragment>
          <Box fontWeight="fontWeightMedium" mt={2} ml={1}>Suggested Videos</Box>
          <ScrollMenu
            onSelect={e => handleSelectVideo(e)}
            arrowLeft={<NavigateBeforeIcon/>}
            arrowRight={<NavigateNextIcon/>}
            data={renderSuggestedVideos()}
          />
        </React.Fragment>
      }
    </div>
  );
};

export default observer(Home);
