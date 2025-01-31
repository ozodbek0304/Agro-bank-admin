import { NavigationTypes } from "@/interfaces/app";
import { ChartMixed, Persons, Box, GearDot, FaceAlien, QrCode } from '@gravity-ui/icons';


export const adminNavigation: NavigationTypes[] = [
    {
        name: "Dashboard",
        icon: ChartMixed,
        path: '/dashboard',
        childrens: []
    },
    {
        name: "Buyurtmalar",
        icon: Box,
        path: '/orders',
        childrens: []
    },
    {
        name: "Arizalar",
        icon: QrCode,
        path: '/payments',
        childrens: []
    },
    {
        name: "Xodimlar",
        icon: Persons,
        path: '/users',
        childrens: []
    }
]


export const ceoNavigation: NavigationTypes[] = [
    {
        name: "Dashboard",
        icon: ChartMixed,
        path: '/dashboard',
        childrens: []
    },
    {
        name: "Adminstratorlar",
        icon: FaceAlien,
        path: '/admins',
        childrens: []
    },
    {
        name: "Buyurtmalar",
        icon: Box,
        path: '/orders',
        childrens: []
    },
    {
        name: "Arizalar",
        icon: QrCode,
        path: '/payments',
        childrens: []
    },
    {
        name: "Xodimlar",
        icon: Persons,
        path: '/users',
        childrens: []
    },
    {
        name: "Sozlamalar",
        icon: GearDot,
        path: '/settings',
        childrens: []
    },
]
