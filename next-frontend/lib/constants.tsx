import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
    {
        title: 'Dashboard',
        path: '/home/dashboard',
        icon: <Icon icon="material-symbols:dashboard-outline" width="24" height="24" />,
    },
    {
        title: 'Leave',
        path: '/home/leave',
        icon: <Icon icon="mdi:form-outline" width="24" height="24" />,
        submenu: true,
        subMenuItems: [
        { title: 'Create Leave Request', path: '/home/leave/create-leave-request' },
        ],
    },
    {
        title: 'Logout',
        path: '/auth/logout',
        icon: <Icon  icon="uiw:logout" rotate={2} width="24" height="24" />,
    },
];