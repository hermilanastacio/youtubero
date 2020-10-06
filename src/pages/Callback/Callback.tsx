import * as React from 'react';
import { useHistory } from "react-router-dom";
import { useStore } from '../../common/stores';

const Callback: React.FC = () => {
  const { authStore, channelStore } = useStore();

  const loadingImg = require('../../assets/images/loading.gif');

  let history = useHistory();

  let code = new URLSearchParams(window.location.search).get("code");

  async function handleRequestToken() {
    let accessToken = await authStore.reqestToken(code);
    channelStore.getMyChannelDetails(accessToken);
  }

  if(code) {
    handleRequestToken();
  }

  history.push('/dashboard');


  return(
    <div style={{height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <img src={loadingImg} alt="loading"/>
    </div>
  );
};

export default Callback;
