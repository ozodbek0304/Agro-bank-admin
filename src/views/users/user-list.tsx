import ErrorBox from '@/components/elements/ErrorBox';
import { Table, TableColumnConfig, withTableActions } from '@gravity-ui/uikit';
import { PencilToSquare } from '@gravity-ui/icons';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useGetUsersQuery } from '@/store/user/userApi';
import { UserItemType } from '@/interfaces/user';
import { formatDateTime } from '@/utils/helpers';
import { setUserData } from '@/store/user/user';
import TableLoader from '@/components/elements/TableLoader';
import UserPagination from './user-pagination';


const UsersList = () => {
    const { queryParams } = useAppSelector(state => state.user)
    const { data, isFetching, isError } = useGetUsersQuery(queryParams, { refetchOnMountOrArgChange: true })
    const dispatch = useAppDispatch()

    const MyTable = withTableActions(Table);

    const columns: TableColumnConfig<UserItemType>[] = [
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
            id: 'mfo',
            name: "MFO",
            width: '25%',
        },
        {
            id: 'tab_number',
            name: "Tab Number",
            width: '19%',
        },
        {
            id: 'crm_id',
            name: "CRM ID",
            width: '19%',
        },
        {
            id: 'created_at',
            name: "Yaratilgan sanasi",
            width: '19%',
            template(item) {
                return formatDateTime(item.created_at)
            },
        },
        {
            id: 'status',
            name: "Holati",
            width: '20%',
            template(item) {
                return (
                    item?.status ? 
                    <span className='text-success'>{"Aktiv" }</span> : 
                    <span className='text-danger'>{"Aktiv Emas"}</span>
                )
            },
        },
        
    ];

    const getRowActions = () => {
        return [
            {
                text: 'Tahrirlash',
                icon: <PencilToSquare />,
                handler: (item: UserItemType) => dispatch(setUserData(item))
            }
        ];
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: '660px' }}>
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> : <MyTable rowActionsSize='l' data={data?.results} columns={columns} getRowActions={getRowActions} />}
                {!isFetching && <UserPagination total={data?.count} />}
            </div>
        </div>
    );
}

export default UsersList;
