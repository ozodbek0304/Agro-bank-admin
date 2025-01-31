import { useAppDispatch, useAppSelector } from "@/store/store";
import { Pagination, PaginationProps, Select } from "@gravity-ui/uikit";
import { pageSizes } from "./orders-list";
import { updateOrderParams } from "@/store/orders/orders";

const OrderPagination = ({ total }: { total: number }) => {

    const { queryParams } = useAppSelector(state => state.orders)
    const dispatch = useAppDispatch()

    const handlePaginate = (value: string) => {
        dispatch(updateOrderParams({ limit: Number(value), offset: 0 }))
        localStorage.setItem('orderPageSize', value)
    }

    const handleUpdate: PaginationProps['onUpdate'] = (page, limit) => {
        dispatch(updateOrderParams({ offset: (page - 1) * queryParams.limit, limit }))
    }


    return (
        <div className='d-flex mt-3'>
            <Pagination page={Math.ceil((queryParams.offset / queryParams.limit) + 1)} total={total} pageSize={queryParams?.limit} onUpdate={handleUpdate} />
            <Select value={[`${queryParams.limit}`]} options={pageSizes} onUpdate={e => handlePaginate(e[0])} />
        </div>
    );
}

export default OrderPagination;
