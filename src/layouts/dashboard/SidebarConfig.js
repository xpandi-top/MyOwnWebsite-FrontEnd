// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'users',
    path: '/dashboard/users',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'Games',
    path: '/dashboard/games',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'Records',
    path: '/dashboard/records',
    icon: getIcon('eva:file-text-fill')
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill')
  },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill')
  // },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill')
  }
];

export default sidebarConfig;
