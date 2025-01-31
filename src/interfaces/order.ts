export interface OrderItemType {
    id?: any
    tao_bao: string
    weight: string
    total_amount: string
    created_at: Date
    user_id: string
    check_img: string
    status: string
    feedback: string
}

export interface CreateOrderType {
    tao_bao: string
    weight: string
    user_id: string
}

export interface UpdateOrderType {
    id: any
    tao_bao?: string
    weight?: string
    user_id?: string
    status?: string
}

export interface IOrderState {
    openCreate: null | {
        image_id: string
        user_id: string
        tao_bao: string
    }
    orderData: null | OrderItemType
    queryParams: {
        status?: string
        search?: string
        limit?: number
        offset?: number
    }
}

export interface OrderResponseType {
    count: number
    results: OrderItemType[]
}