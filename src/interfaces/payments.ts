export type ProviderDto = 'click' | 'by_card' | 'payme' | 'cache'

export interface PaymentItemType {
    id?:number,
    payment_amount: string
    telegram_id: string
    latitude: any
    longitude:any
    status: 'pending' | 'approved' | 'rejected'
    employee: any,
    comment: string,
    payment_date: Date,
    photo:any,
    location?:string,
}

export interface PaymentData {
        results:PaymentItemType[],
        count:number,
        next:string,
}

export interface IPaymentsState {
    openCreate: boolean
    paymentData: null | PaymentItemType
    deleteId: number | null,
    queryParams: {
        search?: string
        limit?: number
        offset?: number
    },
}

export interface UpdatePaymentDto extends PaymentItemType {
    id: number
}