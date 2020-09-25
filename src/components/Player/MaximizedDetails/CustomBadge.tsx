import * as React from 'react';
import { useStore } from '../../../common/stores';
import { observer } from 'mobx-react';
import styles from './CustomBadge.module.scss';

const CustomBadge: React.FC = () => {
  const { videoStore } = useStore();

  return(
    <span className={styles.badgeWrapper}>
      {videoStore.videosQueue.length}
    </span>
  );
};

export default observer(CustomBadge);
