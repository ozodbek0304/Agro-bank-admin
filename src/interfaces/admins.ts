export interface AdminItemType {
    id?: any
    full_name: string
    username: string
    password: string
    created_at?:Date
    region:string
}

export interface AdminData {
        results:AdminItemType[],
        count:number,
        next:string,
}

export interface IAdminsState {
    openCreate: boolean
    adminData: null | AdminItemType
    deleteId: number | null,
    queryParams: {
        search?: string
        limit?: number
        offset?: number
    }
}