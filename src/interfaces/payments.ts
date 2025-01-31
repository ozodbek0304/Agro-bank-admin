export type ProviderDto = 'click' | 'by_card' | 'payme' | 'cache'

export interface PaymentItemType {
    amount: string
    user_id: string
    order_id: number
    status: 'pending' | 'approved' | 'rejected'
    provider: ProviderDto
    payment_id: number,
    username: string,
    update_at: Date
    order_tao_bao: string,
}

export interface CreatePaymentDto {
    user_id: string
    order_tao_bao: string
    amount: string
    provider: string
    status: string
}

export interface IPaymentsState {
    openCreate: boolean
    paymentData: null | PaymentItemType
    deleteId: number | null
}

export interface UpdatePaymentDto extends CreatePaymentDto {
    id: number
}