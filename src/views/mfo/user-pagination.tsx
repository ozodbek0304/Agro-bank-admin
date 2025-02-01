import { useAppDispatch, useAppSelector } from "@/store/store";
import { Pagination, PaginationProps, Select } from "@gravity-ui/uikit";
import { pageSizes } from "../orders/orders-list";
import { updateMfoParams } from "@/store/mfo/mfo";

const UserPagination = ({ total }: { total: number }) => {

    const { queryParams } = useAppSelector(state => state.mfos)
    const dispatch = useAppDispatch()

    const handlePaginate = (value: string) => {
        dispatch(updateMfoParams({ limit: Number(value), offset: 0 }))
        localStorage.setItem('mfoPageSize', value)
    }

    const handleUpdate: PaginationProps['onUpdate'] = (page, limit) => {
        dispatch(updateMfoParams({ offset: (page - 1) * queryParams.limit, limit }))
    }

     

    return (
        <div className='d-flex mt-3'>
            <Pagination page={Math.ceil((queryParams.offset / queryParams.limit) + 1)} total={total} pageSize={queryParams?.limit} onUpdate={handleUpdate} />
            <Select value={[`${queryParams.limit}`]} options={pageSizes} onUpdate={e => handlePaginate(e[0])} />
        </div>
    );
}

export default UserPagination;
