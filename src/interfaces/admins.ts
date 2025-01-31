export interface AdminItemType {
    id?: any
    full_name: string
    username: string
    location?: string
    password: string
}

export interface AdminData {
        results:AdminItemType[],
        count:number,
        next:string,
}

export interface IAdminsState {
    openCreate: boolean
    adminData: null | AdminItemType
    deleteId: number | null
}