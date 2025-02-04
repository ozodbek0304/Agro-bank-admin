import { NavigationTypes } from "@/interfaces/app";
import { ChartMixed, Persons, QrCode } from '@gravity-ui/icons';


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
    },
    {
        name: "MFO",
        icon: ChartMixed,
        path: '/mfo',
        childrens: []
    },
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
]
