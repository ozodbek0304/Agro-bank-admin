import { NavigationTypes } from "@/interfaces/app";
import {  FaceAlien, FileText, GearDot, PersonNutHex, Persons } from '@gravity-ui/icons';


export const adminNavigation: NavigationTypes[] = [
    {
        name: "Anketalar",
        icon: FileText,
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
        icon: FileText,
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
        name: "Mfo",
        icon: PersonNutHex,
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
