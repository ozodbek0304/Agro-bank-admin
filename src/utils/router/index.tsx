// import Dashboard from "@/pages/dashboard";
import { PrivateRouter } from './private-router';

import Login from "../../pages/login";
import App from "../../App";
import NotFound from "@/pages/404";
import Dashboard from '@/pages/dashboard';
import AdminsPage from '@/pages/admins';
import OrdersPage from '@/pages/orders';
import SettingsPage from '@/pages/settings';
import UserListPage from '@/pages/users/user-list';
import UserDetailPage from '@/pages/users/user-detail';
import PaymentsPage from '@/pages/payments';

const privateRoutes: any = [
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/admins',
        element: <AdminsPage />,
    },
    {
        path: '/orders',
        element: <OrdersPage />,
    },
    {
        path: '/settings',
        element: <SettingsPage />
    },
    {
        path: '/users',
        element: <UserListPage />
    },
    {
        path: '/users/:id',
        element: <UserDetailPage />
    },
    {
        path: '/payments',
        element: <PaymentsPage />
    },
    {
        path: "*",
        element: <NotFound />,
    },
].map((item) => ({
    path: item.path,
    element: <PrivateRouter>{item.element} </PrivateRouter>,
}));

export const router: any = [
    ...[
        {
            path: '/login',
            element: (
                <PrivateRouter>
                    <Login />
                </PrivateRouter>
            ),
        },
    ],
    ...privateRoutes,
];
