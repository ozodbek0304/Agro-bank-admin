export interface UserItemType {
    id?: any
    mfo: {
        mfo_code?:string,
        id:number,
        region?:string
    },
    crm_id: string,
    tab_number: string,
    telegram_id: string,
    created_at?:Date;
    status:boolean;
}

export interface CreateUserDto {
    mfo: string,
    crm_id: string,
    tab_number: string,
    telegram_id: string,
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