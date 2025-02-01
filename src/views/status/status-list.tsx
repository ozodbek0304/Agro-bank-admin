import ErrorBox from '@/components/elements/ErrorBox';
import { Table, TableColumnConfig, withTableActions } from '@gravity-ui/uikit';
import { PencilToSquare } from '@gravity-ui/icons';
import { useAppDispatch, useAppSelector } from '@/store/store';
import TableLoader from '@/components/elements/TableLoader';
import UserPagination from './user-pagination';
import { useGetStatusQuery } from '@/store/status/statusApi';
import { StatusItemType } from '@/interfaces/status';
import { setUserData, updateStatusParams } from '@/store/status/status';



const StatusLists = () => {
      const { queryParams } = useAppSelector(state => state.status)
    const { data, isFetching, isError } = useGetStatusQuery(queryParams)
    const dispatch = useAppDispatch();

    const MyTable: any = withTableActions(Table);

    const columns: TableColumnConfig<StatusItemType>[] = [
        {
            id: 'id',
            name: "#",
            width: '5%',
            template(item, index) {
                item
                return queryParams.offset + index + 1
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
            width: '30%',
        },
    ];

    const getRowActions: any = () => {
        return [
            {
                text: 'Tahrirlash',
                icon: <PencilToSquare />,
                handler: (item: StatusItemType) => dispatch(setUserData(item))
            },
        ];
    };

     console.log(queryParams);
     


    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: '660px' }}>
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> : 
                <MyTable rowActionsSize='l' data={data?.results}
                 columns={columns} getRowActions={getRowActions}
                 onRowClick={(item:any) => dispatch(updateStatusParams({parent:item}))}

                 />}
                {!isFetching && <UserPagination total={data?.count} />}
            </div>
        </div>
    );
}

export default StatusLists;
