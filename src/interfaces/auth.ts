
export interface AppAuthTypes {
    isLogin: boolean
    token: string | null
}

export interface LoginProps {
    phone: string
    password: string
}

export interface LoginUserType {
    id: number
    phone: string
    tokens: {
        refresh: string
        access: string
    }
}
