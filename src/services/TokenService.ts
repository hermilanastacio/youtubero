//please follow below interface for applying authorization in your app
import axios from 'axios';
import { grant_type } from '../common/constants';
import config from '../config/index';

export class TokenService {
  /**
   * PURPOSE:  Check in localstorage if access token is there 
   *           This function can be used to show/hide login screen
   *           if this function found an expired access token and if there is a valid refresh token 
   *           available in the cache/localstorage then this function should silently renew the 
   *           access token without showing the popup window.
   * RETURN:   A promise that resolves to a boolean that indicates the silent login is not possible
   *           The reason why this method is async is because we are keeping refresh tokens on 
   *           the server-side and we need to see if these tokens are valid to be used for silent login.
   */
  public static hasToken = async(): Promise<boolean> => {
    return false; //replace this with your code
  }

  /**
   * PURPOSE: Call this function when "hasToken" returns false which shows that there is 
   *          no valid access token or refresh available in the cache/localstorage.
   *          This function should start a new authorization codeflow by opening a window 
   *          asking user to authorize the app using his credentials
   *          and return the access token while keeping the refresh token somewhere in localstorage
   * RETURN:  A promise that resolves to a string containing the valid access token
   */
  public static requestToken = async (code: string): Promise<string> => {
    try {
      let { data }: any = await axios.post(`${config.BASE_TOKEN_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&code=${code}&grant_type=${grant_type}&redirect_uri=${encodeURIComponent(process.env.REACT_APP_CALLBACK_URL)}`);
      return data.access_token;
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * PURPOSE: Call this function when "hasToken" returns true which shows that there is 
   *          a valid access token available in the cache/localstorage.
   * RETURN:  A promise that resolves to a string containing the valid access token
   */
  public static getToken = async (): Promise<string> => {
    return ''; //replace this with your code
  }

  /**
   * PURPOSE: Call this function when user clicks on signout.
   *          This fucntion should remove all the tokens (access/refresh) from cache/localstorage.
   * RETURN:  A promise which signals that the cache has been cleared.
   *          The reason why this method is async is because emptying of cache could happen on 
   *          the server-side (nodeJs/aspnet) 
   */
  public static clearToken = (): Promise<void> => {
    return Promise.resolve();
  }
}