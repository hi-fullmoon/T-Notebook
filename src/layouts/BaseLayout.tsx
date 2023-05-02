import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/sidebar';
import classes from './BaseLayout.module.less';

const BaseLayout: React.FC = () => {
  return (
    <div className={classes.layout}>
      <Sidebar />
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
