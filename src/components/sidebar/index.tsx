import { Button } from 'antd';
import classes from './index.module.less';

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.avator}>
        <img />
      </div>
      <Button>+ 新建</Button>
    </div>
  );
};

export default Sidebar;
