import ErrorBox from '@/components/elements/ErrorBox';
import { Table, TableColumnConfig, withTableActions } from '@gravity-ui/uikit';
import { PencilToSquare } from '@gravity-ui/icons';
import { useAppDispatch, useAppSelector } from '@/store/store';
import TableLoader from '@/components/elements/TableLoader';
import UserPagination from './user-pagination';
import { StatusItemType, StatusResponseType } from '@/interfaces/status';
import { setUserData, updateStatusParams } from '@/store/status/status';

interface Props {
    data: StatusResponseType,
    isError: boolean,
    isFetching: boolean,
}


export const selectChoicTitle = {
    in_one_month: 'Bir oy ichida sana tanlay oladi',
    ten_day_in_month: '1 oy ichida 10 kun kirta oladi va pul miqdori',
    ten_day_in_month_and_not_money: "1 oy ichida 10 kun kirita oladi va pul miqdori yo'q",
}

const StatusLists = ({ data, isError, isFetching }: Props) => {
    const { queryParams } = useAppSelector(state => state.status)
    const dispatch = useAppDispatch();
    const MyTable: any = withTableActions(Table);
    const { role } = useAppSelector(state => state.auth)

    const columns: TableColumnConfig<StatusItemType>[] = [
        {
            id: 'id',
            name: "#",
            width: '7%',
            template(item, index) {
                item
                return (
                    <div className='d-flex align-items-center gap-1'>
                        <span>{queryParams.offset + index + 1}</span>
                        {item?.children && <span style={{ minWidth: "10px", minHeight: "10px", backgroundColor: "green", borderRadius: "50%", border: "none" }}></span>}
                    </div>
                )
            },
        },
        {
            id: 'name',
            name: "Nomi",
            width: '30%',
        },
        {
            id: 'status_id',
            name: "Holat ID",
            width: '20%',
        },
        {
            id: 'requirement',
            name: "Majburiy qismlar",
            width: '50%',
            template(item) {
                return (
                    <span>{item?.requirement ? selectChoicTitle[item?.requirement] : "---"}</span>
                )
            },
        },
    ];

    const getRowActions: any = () => {
        return [
            ...(role !== "checker" ? [{
                text: 'Tahrirlash',
                icon: <PencilToSquare />,
                handler: (item: StatusItemType) => dispatch(setUserData(item))
            },] : [])
        ];
    };


    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: '700px' }}>
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> :
                    <MyTable rowActionsSize='l' data={data?.results}
                        columns={columns} getRowActions={getRowActions}
                        onRowClick={(item: any) => {
                            if (item?.children) {
                                dispatch(updateStatusParams({ parent: item?.id }));
                            }
                        }}

                    />}
                {!isFetching && data?.count > 10 && <UserPagination total={data?.count} />}
            </div>
        </div>
    );
}

export default StatusLists;
