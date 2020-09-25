import * as React from 'react';
import { useEffect } from 'react';

import { AuthCodeRequester } from './callback/oauth/AuthCodeRequester';

function AuthExample() {

    useEffect(() => {

        //URL FOR RETRIEVING AUTH CODE
        let authUrl = `<REPLACE WITH YOUR URL>`; 

        //the query string that contains the auth code in the redirect URL
        let queryStringKey = "code"   

        let authCodeRequester = new AuthCodeRequester(queryStringKey);
        authCodeRequester.getAuthCode(authUrl).then((res)=>{
        
          //Auth code will be shown in the console
          console.log(res);
        });
    });    

  return (
    <></>
  );
}

export default AuthExample;
