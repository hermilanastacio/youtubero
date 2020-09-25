import * as React from 'react';

export const Callback = () => {

  const receiveConfirmMessage = (event) =>{
    const { origin, data } = event;

    if (origin !== window.location.origin || data !== 'HOVVA_AUTHCODE_CONFIRMED')
      return;
    
    window.removeEventListener('message', receiveConfirmMessage);
    window.close();
  };
   
    React.useEffect(() => {
    // get the URL which will include the auth token
     if (window.opener) {
       // send them to the opening window
       window.opener.postMessage(window.location.href);
       window.addEventListener('message', event => receiveConfirmMessage(event), false);
     }
   });
   // some text to show the user
   return <p>Please wait...</p>;
};