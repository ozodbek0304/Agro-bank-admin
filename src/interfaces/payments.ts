export type ProviderDto = 'click' | 'by_card' | 'payme' | 'cache'

export interface PaymentItemType {
    id?:number,
    payment_amount: string
    telegram_id: string
    latitude: any
    longitude:any
    status: any,
    employee: any,
    comment: string,
    payment_date: Date,
    photo:any,
    location?:string,
    region?:string,
    color?:string
}

export interface PaymentData {
        results:PaymentItemType[],
        count:number,
        next:string,
}

export interface IPaymentsState {
    paymentData: null | PaymentItemType
    deleteId: number | null,
    queryParams: {
        search?: string
        limit?: number
        offset?: number
        region?: string,
        employee?: string,
    },
}

export interface UpdatePaymentDto extends PaymentItemType {
    id: number
}