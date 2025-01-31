
export interface AppAuthTypes {
    isLogin: boolean
    token: string | null
}

export interface LoginProps {
    username: string
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
