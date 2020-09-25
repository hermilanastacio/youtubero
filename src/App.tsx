import * as React from 'react';
import Home from './pages/Home/Home';
import Library from './pages/Library/Library';
import Subscription from './pages/Subscription/Subscription';
import Explore from './pages/Explore/Explore';
import TopNav from './components/TopNav/TopNav';
import BottomNav from './components/BottomNav/BottomNav';
import CustomPopover from './components/Popover/Popover';
import SearchList from './pages/Search/SearchList';
import Player from './components/Player/Player';
import { useStore } from './common/stores';
import { observer } from 'mobx-react';
import CustomToastr from './components/Toastr/CustomToastr';

function App() {
  const { modalStore } = useStore();

  const generateActivePage = () => {
    let { activeTab } = modalStore;

    if(modalStore.isSearch) {
      return <SearchList/>;
    } else if (activeTab === 0) {
      return <Home/>;
    } else if (activeTab === 1) {
      return <Explore/>;
    } else if (activeTab === 2) {
      return <Subscription/>;
    } else if (activeTab === 3) {
      return <Library/>;
    } else if (activeTab === 4) {
      return <SearchList/>;
    }
  }

  return (
    <div className="App">
      <TopNav/>
      <CustomPopover/>
      <CustomToastr/>
      {generateActivePage()}
      <Player/>
      <BottomNav/>
    </div>
  );
}

export default observer(App);
