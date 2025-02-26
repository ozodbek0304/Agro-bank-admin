
export interface AppStateTypes {
    theme: 'dark' | 'light'
    defaultTheme: 'light'
    menuType: 'full' | 'collepse'
}

export interface NavigationTypes {
    name: string
    icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element
    path: string
    childrens: string[]
}
export interface AppAuthTypes {
    isLogin: boolean
    token: string | null
    role: 'admin' | 'superuser'| "checker"
}


