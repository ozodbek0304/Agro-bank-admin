import { useAppDispatch, useAppSelector } from "@/store/store";
import { Pagination, PaginationProps, Select } from "@gravity-ui/uikit";
import { updateStatusParams } from "@/store/status/status";
import { pageSizes } from "../users/user-pagination";

const UserPagination = ({ total }: { total: number }) => {

    const { queryParams } = useAppSelector(state => state.status)
    const dispatch = useAppDispatch()

    const handlePaginate = (value: string) => {
        dispatch(updateStatusParams({ limit: Number(value), offset: 0 }))
        localStorage.setItem('statusPageSize', value)
    }

    const handleUpdate: PaginationProps['onUpdate'] = (page, limit) => {
        dispatch(updateStatusParams({ offset: (page - 1) * queryParams.limit, limit }))
    }

     

    return (
        <div className='d-flex mt-3'>
            <Pagination page={Math.ceil((queryParams.offset / queryParams.limit) + 1)} total={total} pageSize={queryParams?.limit} onUpdate={handleUpdate} />
            <Select value={[`${queryParams.limit}`]} options={pageSizes} onUpdate={e => handlePaginate(e[0])} />
        </div>
    );
}

export default UserPagination; 


