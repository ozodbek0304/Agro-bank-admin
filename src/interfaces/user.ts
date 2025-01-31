export interface UserItemType {
    id?: any
    full_name: string
    username: string
    order_count: number
    created_at: Date
    user_id: string
}

export interface CreateUserDto {
    username: string
}

export interface UpdateUserDto {
    user_id: string | undefined
    full_name: string
    username: string
}

export interface IUserState {
    openCreate: boolean
    userData: null | UserItemType
    deleteId: number | null
    queryParams: {
        search?: string
        limit?: number
        offset?: number
    }
}


export interface UsersResponseType {
    count: number
    results: UserItemType[]
}

export interface UserParamsType {
    search?: string
    limit?: number
    offset?: number
}