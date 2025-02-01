// import Dashboard from "@/pages/dashboard";
import { PrivateRouter } from './private-router';

import Login from "../../pages/login";
import App from "../../App";
import NotFound from "@/pages/404";
import MFOPages from '@/pages/mfo';
import AdminsPage from '@/pages/admins';
import OrdersPage from '@/pages/orders';
import SettingsPage from '@/pages/status';
import UserListPage from '@/pages/employes/employes-list';
import UserDetailPage from '@/pages/employes/employes-detail';
import PaymentsPage from '@/pages/payments';

const privateRoutes: any = [
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/mfo',
        element: <MFOPages />,
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
        path: '/status',
        element: <SettingsPage />
    },
    {
        path: '/employes',
        element: <UserListPage />
    },
    {
        path: '/employes/:id',
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
