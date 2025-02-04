export interface MfoItemType {
    id?: any
    mfo_code: string
    branch_name: string
    region: string
}

export interface MfoData {
        results:MfoItemType[],
        count:number,
        next:string,
}

export interface IMFOsState {
    openCreate: boolean,
    adminData: null | MfoItemType,
    queryParams: {
        search?: string
        limit?: number
        offset?: number
        region?: string,
    },
}