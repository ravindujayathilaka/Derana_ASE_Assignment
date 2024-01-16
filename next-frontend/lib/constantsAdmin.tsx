import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS_ADMIN: SideNavItem[] = [
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
        { title: 'Leave List', path: '/home/leave/leave-list' },
        { title: 'Create Leave Request', path: '/home/leave/create-leave-request' },
        ],
    },
    {
        title: 'Admin Config',
        path: '/home/admin-config',
        icon: <Icon icon="ri:admin-line" width="24" height="24" />,
        submenu: true,
        subMenuItems: [
        { title: 'User Management', path: '/home/admin-config/user-management' },
        ],
    },
    {
        title: 'Logout',
        path: '/auth/logout',
        icon: <Icon  icon="uiw:logout" rotate={2} width="24" height="24" />,
    },
];