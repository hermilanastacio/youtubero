import * as React from 'react';
import { AppBar, Toolbar, IconButton, TextField } from '@material-ui/core';
import { ReactComponent as YouTubeLogo } from '../../assets/images/logo.svg';
import { generateAuthUrl, generateUploadVideoUrl } from '../../common/utils';
import { useStore } from '../../common/stores';
import styles from './TopNav.module.scss';
import { observer } from 'mobx-react';
import { 
  Close as CloseIcon,
  Search as SearchIcon,
  VideoCall as UploadVideoIcon
} from '@material-ui/icons';

const TopNav: React.FC = () => {
  const { authStore, modalStore, videoStore, channelStore } = useStore();

  const handleSubmitSearch = (e: any) => {
    e.preventDefault();
    //Checks if search keyword is empty or same w/ the previous one
    if(modalStore.searchKey && modalStore.previousSearchKey !== modalStore.searchKey) {
      videoStore.searchVideoByKeyword(modalStore.searchKey);
      modalStore.setPreviousSearchKey(modalStore.searchKey);
    }
  }

  const validateSignOut = () => {
    let isSure = window.confirm('Are you sure you want to sign out?');
    
    if(isSure) {
      authStore.setAccessToken(""); 
      modalStore.setActiveTab(0);
    }
  }

  const handleClickSearch = () => {
    modalStore.setIsSearch(true);
    modalStore.setSearchKey("");
  }

  return (
    <>
      <div className={styles.topLoginWrapper}>
        {!authStore.accessToken && <a className={styles.loginText} href={generateAuthUrl()}>Sign In</a>}
        {authStore.accessToken && <span className={styles.loginText} onClick={validateSignOut}>Sign Out</span>}
      </div>
      <AppBar position="static" color="default">
        <Toolbar>
          {modalStore.isSearch
            ? <form 
                onSubmit={(e) => handleSubmitSearch(e)} 
                className={styles.searchForm}
              >
                <TextField 
                  onChange={(e) => modalStore.setSearchKey(e.target.value)} 
                  placeholder="Please enter keyword" 
                  value={modalStore.searchKey} 
                  variant="outlined" 
                  size="small"
                  fullWidth 
                />
                <IconButton 
                  onClick={() => modalStore.setIsSearch(false)} 
                  className={styles.closeIconWrapper} 
                  size="small"
                >
                  <CloseIcon/>
                </IconButton>
              </form>
            : <React.Fragment>
                <YouTubeLogo style={{height: "35%"}}/>
                <IconButton 
                  onClick={handleClickSearch} 
                  className={styles.searchBtnWrapper} 
                  color="inherit" 
                >
                  <SearchIcon className={styles.searchIcon}/>
                </IconButton>
                <IconButton 
                  className={styles.uploadBtnWrapper}
                  rel="noopener noreferrer"
                  href={generateUploadVideoUrl(channelStore.myChannelDetails.length > 0 
                    ? channelStore.myChannelDetails[0].contentDetails.id
                    : "")}
                  target="_blank" 
                  color="inherit"
                >
                  <UploadVideoIcon className={styles.uploadIcon}/>
                </IconButton>
              </React.Fragment>
          }
        </Toolbar>
      </AppBar>
    </>
  );
};

export default observer(TopNav);
