import { NavigationTypes } from "@/interfaces/app";
import { ChartMixed, FaceAlien, GearDot, Persons, QrCode } from '@gravity-ui/icons';


export const adminNavigation: NavigationTypes[] = [
    {
        name: "Anketalar",
        icon: QrCode,
        path: '/blanks',
        childrens: []
    },
    {
        name: "Xodimlar",
        icon: Persons,
        path: '/employes',
        childrens: []
    }
]


export const ceoNavigation: NavigationTypes[] = [
    {
        name: "Anketalar",
        icon: QrCode,
        path: '/blanks',
        childrens: []
    },
    {
        name: "Xodimlar",
        icon: Persons,
        path: '/employes',
        childrens: []
    },
    {
        name: "Adminstratorlar",
        icon: FaceAlien,
        path: '/admins',
        childrens: []
    },
    {
        name: "MFO",
        icon: ChartMixed,
        path: '/mfo',
        childrens: []
    },
    {
        name: "Holatlar",
        icon: GearDot,
        path: '/status',
        childrens: []
    },
]
