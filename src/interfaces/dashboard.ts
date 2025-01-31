
export interface StatsResponse {
    total_amount_sum: number
    approved_payments_sum: number
    order_status_counts: {
        arrived_warehouse: number
        waiting_for_payment: number
        to_country: number
        in_country_warehouse: number
        delivered: number
        total: number
        canceled: number
    }
}

export interface YearlyResponse {
    year: number
    monthly_data: {
        month: number,
        approved_payments_sum: number,
        orders_count: number
    }[]
}