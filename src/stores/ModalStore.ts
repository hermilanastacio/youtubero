import { observable, action } from 'mobx';
import { CategoryType, toasterTypes } from '../common/types';

interface IToastr {
  message: string;
  subMessage: string;
  type: toasterTypes;
  isShow: boolean;
};

export class ModalStore {
  @observable
  public isPlaying: boolean = false;

  @observable
  public isSearch: boolean = false;

  @observable
  public toastr: IToastr = { message: "", subMessage: "", type: "", isShow: false };

  @observable
  public searchKey: string = "";

  @observable
  public previousSearchKey: string = "";

  @observable
  public anchorEl: any = null;

  @observable
  //0 - Home | 1- Explore | 2 - Subscription | 3 - Library
  public activeTab: number = 0;

  @observable
  public activeCategory: number = CategoryType.Music;

  @action
  public showToastr(message: string, subMessage: string, type: toasterTypes, isShow: boolean) {
    this.toastr = { message, subMessage, type, isShow };
    setTimeout(() => { 
      if(isShow) {
        this.showToastr("", "", "", false)
      }
    }, 3000);
  }

  @action
  public setIsSearch(state: boolean) {
    this.isSearch = state;
  }
  
  @action
  public setSearchKey(key: string) {
    this.searchKey = key;
  }

  @action
  public setPreviousSearchKey(key: string) {
    this.previousSearchKey = key;
  }

  @action
  public setIsPlaying(state: boolean) {
    this.isPlaying = state;
  }

  @action
  public setAnchorEl(el: any) {
    this.anchorEl = el;
  }

  @action
  public setActiveTab(tab: number) {
    this.activeTab = tab;
  }

  @action
  public setActiveCategory(category: number) {
    this.activeCategory = category;
  }
}
