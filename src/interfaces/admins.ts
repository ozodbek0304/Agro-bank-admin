export interface AdminItemType {
    id?: any
    full_name: string
    phone: string
    location: string
    password: string
}

export interface IAdminsState {
    openCreate: boolean
    adminData: null | AdminItemType
    deleteId: number | null
}