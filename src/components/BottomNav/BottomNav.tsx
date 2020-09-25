import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../common/stores';
import {
  BottomNavigationAction,
  BottomNavigation
} from '@material-ui/core';
import { 
  Subscriptions as SubscriptionsIcon, 
  VideoLibrary as VideoLibraryIcon,
  Explore as ExploreIcon,
  Home as HomeIcon
} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    borderTop: "1px solid #eae9e9",
    "& .Mui-selected": {
      color: "#f00"
    }
  },
});

const BottomNav: React.FC = () => {
  const { modalStore, authStore } = useStore();
  const classes = useStyles();

  const handleToggleTab = (newTab: any) => {
    if(!authStore.accessToken && (newTab === 2 || newTab === 3)) {
      return modalStore.showToastr(
        'You must sign in first',
        'Please sign in to enjoy all the features of youtube',
        'warning', 
        true
      );
    }

    modalStore.setActiveTab(newTab);
    modalStore.setIsSearch(false);
  }

  return (
    <BottomNavigation
      onChange={(_, newTab) => handleToggleTab(newTab)}
      className={classes.root}
      value={!modalStore.isSearch && modalStore.activeTab}
      showLabels
    >
      <BottomNavigationAction 
        icon={<HomeIcon />}
        label="Home" 
      />
      <BottomNavigationAction 
        icon={<ExploreIcon />}
        label="Explore" 
      />
      <BottomNavigationAction 
        icon={<SubscriptionsIcon />}
        label="Subscription" 
      />
      <BottomNavigationAction 
        icon={<VideoLibraryIcon />}
        label="Library" 
      />
    </BottomNavigation>
  );
};

export default BottomNav;
