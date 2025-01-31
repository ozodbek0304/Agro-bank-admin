import ErrorBox from '@/components/elements/ErrorBox';
import { Table, TableColumnConfig, withTableActions } from '@gravity-ui/uikit';
import { PencilToSquare } from '@gravity-ui/icons';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useGetUsersQuery } from '@/store/user/userApi';
import { UserItemType } from '@/interfaces/user';
import { formatDateTime, formatPhone } from '@/utils/helpers';
import { setUserData } from '@/store/user/user';
import { useNavigate } from 'react-router-dom';
import TableLoader from '@/components/elements/TableLoader';
import UserPagination from './user-pagination';


const UsersList = () => {
    const { queryParams } = useAppSelector(state => state.user)
    const { data, isFetching, isError } = useGetUsersQuery(queryParams, { refetchOnMountOrArgChange: true })
    const dispatch = useAppDispatch()
    const push = useNavigate()

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
            id: 'full_name',
            name: "To'liq ismi",
            width: '19%',
        },
        {
            id: 'username',
            name: "Telefon raqam",
            width: '19%',
            template(item) {
                if (item.username?.split('').includes('@')) {
                    return item.username
                } else {
                    return formatPhone(item.username)
                }
            },
        },
        {
            id: 'user_id',
            name: "Buyurtmachi ID",
            width: '19%',
        },
        {
            id: 'order_count',
            name: "Buyurtmalar soni",
            width: '19%',
        },
        {
            id: 'created_at',
            name: "Ro'yxatdan o'tgan sana",
            width: '19%',
            template(item) {
                return formatDateTime(item.created_at)
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
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> : <MyTable rowActionsSize='l' onRowClick={(item) => push(`/users/${item?.user_id}`)} data={data?.results} columns={columns} getRowActions={getRowActions} />}
                {!isFetching && <UserPagination total={data?.count} />}
            </div>
        </div>
    );
}

export default UsersList;
