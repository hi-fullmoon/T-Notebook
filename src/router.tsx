import { createHashRouter } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import Main from './pages/main';

const router = createHashRouter([
  {
    path: '/',
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: Main,
      },
      {
        path: 'main',
        Component: Main,
      },
    ],
  },
]);

export default router;
