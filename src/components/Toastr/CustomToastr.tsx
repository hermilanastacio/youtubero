import * as React from 'react';
import { Box, Fade } from '@material-ui/core';
import { useStore } from '../../common/stores';
import styles from './CustomToastr.module.scss';
import { observer } from 'mobx-react';

const CustomToastr: React.FC = () => {
  const { modalStore, authStore, videoStore } = useStore();

  const generateStyle = () => {
    switch(modalStore.toastr.type){
      case 'success':
       return styles.success;
      case 'warning':
       return styles.warning;
    }
  }

  return(
    <Fade 
      in={modalStore.toastr.isShow} 
      timeout={200}
    >  
      <div className={`${generateStyle()} ${videoStore.isMaximize && modalStore.isPlaying && styles.reduceBottom}`}>
        <Box>{modalStore.toastr.message}</Box>
        {!authStore.accessToken && 
          <Box fontSize={12} pt={.5}>
            {modalStore.toastr.subMessage}
          </Box>
        }
      </div>
    </Fade>
  );
};

export default observer(CustomToastr);
