import { observable, action } from "mobx";
import { persist } from 'mobx-persist';
import { TokenService } from '../services/TokenService';

export class AuthStore {
  @persist
  @observable
  public accessToken: string = "";

  @action
  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  @action
  public async reqestToken(code: string) {
    try {
      let accessToken = await TokenService.requestToken(code);
      this.setAccessToken(accessToken);
      return accessToken;
    } catch (error) {
      console.log(error);
    }
  }
}
