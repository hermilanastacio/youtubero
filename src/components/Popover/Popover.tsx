import * as React from 'react';
import { Popover, ListItem, ListItemText } from '@material-ui/core';
import { useStore } from '../../common/stores';
import { observer } from 'mobx-react';

const CustomPopover: React.FC = () => {
  const { modalStore, videoStore } = useStore();
  
  const open = Boolean(modalStore.anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleRemoveInQueue = () => {
    let isSuccess = videoStore.removeVideoInQueue(videoStore.clickedVideoDetails)

    if(isSuccess) {
      modalStore.showToastr(
        'Removed to queue', 
        'Please sign in to enjoy all the features of youtube', 
        'success', 
        true
      );
    } else {
      modalStore.showToastr(
        'Error removing in queue', 
        'Please sign in to enjoy all the features of youtube', 
        'warning', 
        true
      );
    }

    modalStore.setAnchorEl(null);
  }

  const handleAddToQueue = () => {
    let isSuccess = videoStore.addVideoToQueue(videoStore.clickedVideoDetails)

    if(isSuccess) {
      modalStore.showToastr(
        'Added to queue', 
        'Please sign in to enjoy all the features of youtube', 
        'success', 
        true
      );
    } else {
      modalStore.showToastr(
        'Already exist in queue', 
        'Please sign in to enjoy all the features of youtube', 
        'warning', 
        true
      );
    }
    
    modalStore.setAnchorEl(null);
  }
  
  return(
    <Popover
      id={id}
      open={open}
      anchorEl={modalStore.anchorEl}
      onClose={() => modalStore.setAnchorEl(null)}
      anchorOrigin={{ 
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
    >
      {videoStore.maximizedDetailsActiveTab === 2
        ? <ListItem onClick={handleRemoveInQueue} button>
            <ListItemText primary="Remove to queue" />
          </ListItem>
        : <ListItem onClick={handleAddToQueue} button>
            <ListItemText primary="Add to queue" />
          </ListItem>
      }
    </Popover>
  );
};

export default observer(CustomPopover);
