export interface StatusItemType {
    id?: any
    name:string;
    status_id:string;
    parent?:string;
    children?:any[];
    level:number;
}


export interface IStatusState {
    openCreate: boolean
    userData: null | StatusItemType
    deleteId: any[];
    queryParams: {
        parent?: string
        limit?: number
        offset?: number
    }
}


export interface StatusResponseType {
    count: number
    results: StatusItemType[]
}

export interface StatusParamsType {
    search?: string
    limit?: number
    offset?: number
}