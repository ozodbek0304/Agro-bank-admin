import ErrorBox from '@/components/elements/ErrorBox';
import { Table, TableColumnConfig, withTableActions } from '@gravity-ui/uikit';
import { PencilToSquare } from '@gravity-ui/icons';
import { useAppDispatch, useAppSelector } from '@/store/store';
import TableLoader from '@/components/elements/TableLoader';
import UserPagination from './user-pagination';
import { StatusItemType, StatusResponseType } from '@/interfaces/status';
import { setUserData, updateStatusParams } from '@/store/status/status';

interface Props {
    data:StatusResponseType,
    isError:boolean,
    isFetching: boolean,
}

const StatusLists = ({data,isError, isFetching}:Props) => {
      const { queryParams } = useAppSelector(state => state.status)
    const dispatch = useAppDispatch();

    const MyTable: any = withTableActions(Table);

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
                        {item?.children && <span style={{minWidth:"10px", minHeight:"10px", backgroundColor:"green", borderRadius:"50%", border:"none"}}></span>}
                    </div>
                )
            },
        },
        {
            id: 'name',
            name: "Nomi",
            width: '50%',
        },
        {
            id: 'status_id',
            name: "Holat ID",
            width: '50%',
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
                {!isFetching && data?.count>10 && <UserPagination total={data?.count} />}
            </div>
        </div>
    );
}

export default StatusLists;
